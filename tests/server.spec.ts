import { expect, test } from "@playwright/test";

test.describe("Server", () => {
  test("should return Hello World", async ({ request }) => {
    const response = await request.get("http://localhost:3000");
    expect(response.ok()).toBeTruthy();
    expect(await response.text()).toBe("Hello World!\n");
  });

  test("should return 200 status code", async ({ request }) => {
    const response = await request.get("http://localhost:3000");
    expect(response.status()).toBe(200);
  });

  test("should have correct content type", async ({ request }) => {
    const response = await request.get("http://localhost:3000");
    expect(response.headers()["content-type"]).toBe("text/plain");
  });
});
