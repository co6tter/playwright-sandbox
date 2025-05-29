import { test as base } from "@playwright/test";
import type { BrowserContext, Page, Request, Response, Route } from "@playwright/test";

type Logger = (count: number, capacity: number, method: string, url: string) => void;

class TokenBucketLimiter {
  private readonly capacity: number;
  private readonly refillAmount: number;
  private tokens = 0;
  private readonly queue: Route[] = [];
  private timer: NodeJS.Timeout | undefined;
  private readonly sent: number[] = [];
  private logger: Logger | null = null;

  constructor(capacity = 60) {
    this.capacity = capacity;
    this.refillAmount = Math.max(1, Math.floor(capacity / 60));
  }

  setLogger(fn: Logger): void {
    this.logger = fn;
  }

  throttle(route: Route): void {
    const req = route.request();

    if (this.count() >= this.capacity) {
      this.queue.push(route);
      if (!this.timer) {
        this.scheduleRefill();
      }
      return;
    }

    if (this.tokens > 0) {
      this.tokens--;
      this.record(req.method(), req.url());
      route.continue();
      return;
    }
    this.queue.push(route);
    if (!this.timer) {
      this.scheduleRefill();
    }
  }

  count(): number {
    const now = Date.now();
    while (this.sent.length && now - this.sent[0] >= 60_000) this.sent.shift();
    return this.sent.length;
  }

  scheduleRefill(): void {
    this.timer = setTimeout(() => this.refill(), 1_000);
  }

  private refill(): void {
    this.tokens = Math.min(this.capacity, this.tokens + this.refillAmount);

    while (this.tokens > 0 && this.queue.length > 0) {
      if (this.count() >= this.capacity) break;

      const r = this.queue.shift();
      if (!r) break;
      this.tokens--;
      const req = r.request();
      this.record(req.method(), req.url());
      r.continue();
    }

    if (this.tokens < this.capacity || this.queue.length > 0) {
      this.timer = setTimeout(() => this.refill(), 1_000);
    } else {
      this.timer = undefined;
    }
  }

  private record(method: string, url: string) {
    this.sent.push(Date.now());
    if (this.logger) {
      this.logger(this.count(), this.capacity, method, url);
    }
  }
}

const limiterPool = new Map<number, TokenBucketLimiter>();

const getLimiter = (rpm = 60): TokenBucketLimiter => {
  let instance = limiterPool.get(rpm);
  if (!instance) {
    instance = new TokenBucketLimiter(rpm);
    limiterPool.set(rpm, instance);
  }
  return instance;
};

base.describe.configure({ mode: "serial" });

export const test = base.extend<{
  context: BrowserContext;
  page: Page;
  rpm: number;
}>({
  rpm: [60, { option: true }],

  context: async ({ browser, rpm }, use) => {
    const context = await browser.newContext();
    const limiter = getLimiter(rpm);

    limiter.setLogger((count, capacity, method, url) => {
      console.log(`[RL] ${method} ${url}  (${count}/${capacity} in last min)`);
    });

    await context.route("**/*", (route: Route, req: Request) => {
      if (req.url().includes("/api/") || req.url().includes("api.")) {
        limiter.throttle(route);
      } else {
        route.continue();
      }
    });

    await use(context);
    await context.close();
  },

  page: async ({ context }, use) => {
    const page = await context.newPage();

    page.on("response", (res: Response) => {
      const status = res.status();
      if ([401, 429].includes(status) || status >= 500) {
        throw new Error(`HTTP ${status} – ${res.request().method()} ${res.url()}`);
      }
    });

    await use(page);
    await page.close();
  },
});

export { expect } from "@playwright/test";
