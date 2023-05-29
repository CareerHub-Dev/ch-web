import { test, expect } from "@playwright/test";

const baseUrl = "/auth";
const loginUrl = `${baseUrl}/login`;
const registerUrl = `${baseUrl}/register`;
const activateUrl = `${baseUrl}/activate-account`;
const forgotPasswordUrl = `${baseUrl}/forgot-password`;

test("Auth pages navigation test", async ({ page }) => {
  await page.goto(loginUrl);
  // await page.click('button:is(:text("Увійти"))');
  await page.click("text=Зареєструватися");
  await expect(page).toHaveURL(registerUrl);
  await page.click("text=Увійти");
  await expect(page).toHaveURL(loginUrl);
  await page.click("text=Забули пароль?");
  await expect(page).toHaveURL(forgotPasswordUrl);
  await page.click("text=Увійти");
  await expect(page).toHaveURL(loginUrl);
  await page.click("text=Активувати акаунт");
  await expect(page).toHaveURL(activateUrl);
});

test("Email and password fields validation", async ({ page }) => {
  await page.goto(loginUrl);
  let emailErrorParagraph = await page.$("#email-error");
  let passwordErrorParagraph = await page.$("#password-error");

  expect(emailErrorParagraph).toBeNull();
  expect(passwordErrorParagraph).toBeNull();

  await page.click("text=Увійти");
  expect(emailErrorParagraph).toBeDefined();
  expect(passwordErrorParagraph).toBeDefined();

  await page.fill("#email", "test");
  await page.fill("#password", "test");

  expect(emailErrorParagraph).toBeNull();
  expect(passwordErrorParagraph).toBeNull();

  await page.goto(loginUrl);
  expect(emailErrorParagraph).toBeNull();
  expect(passwordErrorParagraph).toBeNull();
  await page.focus("#email");
  await page.focus("#password");
  await page.focus("#email");
  expect(emailErrorParagraph).toBeDefined();
  expect(passwordErrorParagraph).toBeDefined();
});
