import { expect, test } from "@playwright/test";

test.describe("Server", () => {
  test("should return Hello World", async ({ request }) => {
    const response = await request.get("http://localhost:3000/heartbeat");
    expect(response.ok()).toBeTruthy();
    expect(await response.text()).toBe("Hello World!\n");
  });

  test("should return 200 status code", async ({ request }) => {
    const response = await request.get("http://localhost:3000/heartbeat");
    expect(response.status()).toBe(200);
  });

  test("should have correct content type", async ({ request }) => {
    const response = await request.get("http://localhost:3000/heartbeat");
    expect(response.headers()["content-type"]).toBe("text/plain");
  });

  test("should be 'Hello World from HTML' in the h1", async ({ page }) => {
    await page.goto("http://localhost:3000/");
    await expect(page.locator("h1")).toHaveText("Hello World from HTML");
  });

  test("should be 'body 1-1' at row 1, column 1 in the table", async ({ page }) => {
    await page.goto("http://localhost:3000/");
    await expect(page.locator("table tbody tr").first().locator("td").first()).toHaveText("body 1-1");
  });

  test("should be 'body 2-4' at row 2, column 4 in the table", async ({ page }) => {
    await page.goto("http://localhost:3000/");
    await expect(page.locator("table tbody tr").nth(1).locator("td").nth(3)).toHaveText("body 2-4");
  });
});
