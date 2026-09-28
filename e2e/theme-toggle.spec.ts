import { expect, test } from "@playwright/test";

test("theme toggle switches light and dark", async ({ page }) => {
  await page.goto("/");

  await expect(page.getByTestId("theme-toggle-root")).toBeVisible();
  await expect(page.getByTestId("theme-toggle-title")).toHaveText("主題設定");
  await expect(page.getByTestId("theme-toggle-status")).toHaveText(
    "主題：淺色",
  );

  await page.getByTestId("theme-toggle-btn").click();
  await expect(page.getByTestId("theme-toggle-status")).toHaveText(
    "主題：深色",
  );
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");

  await page.getByTestId("theme-toggle-btn").click();
  await expect(page.getByTestId("theme-toggle-status")).toHaveText(
    "主題：淺色",
  );
  await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
});
