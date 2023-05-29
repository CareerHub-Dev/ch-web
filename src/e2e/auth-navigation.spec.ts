import { test, expect } from "@playwright/test";

test("Auth pages navigation test", async ({ page }) => {
    await page.goto("http://localhost:3000/auth/login");
    await page.click("text=Зареєструватися");
    await expect(page).toHaveURL("http://localhost:3000/auth/register");
    await page.click("text=Увійти");
    await expect(page).toHaveURL("http://localhost:3000/auth/login");
});
