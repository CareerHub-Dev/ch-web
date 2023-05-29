import { test, expect } from "@playwright/test";

test("Auth pages navigation test", async ({ page }) => {
    await page.goto("/");
    await page.click("text=Увійти");
    await expect(page).toHaveURL("/auth/login");

    await page.goto("/");
    await page.click("text=Зареєструватися");
    await expect(page).toHaveURL("/auth/register");
});
