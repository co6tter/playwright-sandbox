import { test } from "@playwright/test";

test("B-1 : waits 2-s", async () => {
  console.log("B-1 start", Date.now());
  await new Promise((r) => setTimeout(r, 2000));
  console.log("B-1 end  ", Date.now());
});

test("B-2 : waits 1-s", async () => {
  console.log("B-2 start", Date.now());
  await new Promise((r) => setTimeout(r, 1000));
  console.log("B-2 end  ", Date.now());
});
