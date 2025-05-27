import { test } from "@playwright/test";

test.describe.configure({ mode: "serial" });

test("A-1 : waits 5-s", async () => {
  console.log("A-1 start", Date.now());
  await new Promise((r) => setTimeout(r, 5000));
  console.log("A-1 end  ", Date.now());
});

test("A-2 : waits 1-s", async () => {
  console.log("A-2 start", Date.now());
  await new Promise((r) => setTimeout(r, 1000));
  console.log("A-2 end  ", Date.now());
});
