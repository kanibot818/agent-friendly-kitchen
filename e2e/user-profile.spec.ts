import { expect, test } from "@playwright/test";

test("user profile edit and save flow", async ({ page }) => {
  await page.goto("/");

  await expect(page.getByTestId("user-name")).toHaveText("Alex Huang");
  await expect(page.getByTestId("user-email")).toHaveText("alex@example.com");

  await page.getByTestId("edit-btn").click();
  await expect(page.getByTestId("user-name-input")).toBeVisible();
  await expect(page.getByTestId("user-email-input")).toBeVisible();
  await expect(page.getByTestId("save-btn")).toBeVisible();

  await page.getByTestId("user-name-input").fill("Jordan Lee");
  await page.getByTestId("user-email-input").fill("jordan@example.com");
  await page.getByTestId("save-btn").click();

  await expect(page.getByTestId("user-name")).toHaveText("Jordan Lee");
  await expect(page.getByTestId("user-email")).toHaveText("jordan@example.com");
  await expect(page.getByTestId("save-success")).toHaveText("儲存成功");
});
