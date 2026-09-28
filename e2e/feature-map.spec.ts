import { expect, test } from "@playwright/test";

test("feature map panel lists a known mapped testid", async ({ page }) => {
  await page.goto("/");

  await expect(page.getByTestId("feature-map-root")).toBeVisible();
  await expect(page.getByTestId("feature-map-title")).toHaveText("Feature Map");
  await expect(page.getByTestId("feature-map-summary")).toContainText(
    "features",
  );
  await expect(page.getByTestId("feature-map-list")).toBeVisible();
  await expect(page.getByTestId("feature-map-entry-hello")).toBeVisible();
  await expect(page.getByTestId("feature-map-testid-hello-root")).toHaveText(
    "hello-root",
  );
});
