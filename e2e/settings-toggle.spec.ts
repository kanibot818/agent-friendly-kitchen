import { expect, test } from "@playwright/test";

test("settings toggle switches notifications on and off", async ({ page }) => {
  await page.goto("/");

  await expect(page.getByTestId("settings-toggle-root")).toBeVisible();
  await expect(page.getByTestId("settings-toggle-title")).toHaveText(
    "通知設定",
  );
  await expect(page.getByTestId("settings-toggle-status")).toHaveText(
    "狀態：關閉",
  );

  await page.getByTestId("settings-toggle-btn").click();
  await expect(page.getByTestId("settings-toggle-status")).toHaveText(
    "狀態：開啟",
  );

  await page.getByTestId("settings-toggle-btn").click();
  await expect(page.getByTestId("settings-toggle-status")).toHaveText(
    "狀態：關閉",
  );
});
