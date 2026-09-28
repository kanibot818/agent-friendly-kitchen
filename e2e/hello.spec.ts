import { expect, test } from "@playwright/test";

test("hello feature greets via button click", async ({ page }) => {
  await page.goto("/");

  await expect(page.getByTestId("hello-root")).toBeVisible();
  await expect(page.getByTestId("hello-message")).toHaveText("Hello, kitchen");
  await expect(page.getByTestId("hello-count")).toHaveText("Greetings: 0");

  await page.getByTestId("hello-greet-button").click();

  await expect(page.getByTestId("hello-message")).toHaveText(
    "Hello again (#1)",
  );
  await expect(page.getByTestId("hello-count")).toHaveText("Greetings: 1");
});
