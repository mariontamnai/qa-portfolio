import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { testUsers, shortPassword } from "../fixtures/test-data";

test.describe("Authentication", () => {
  test("valid credentials redirect to face recognition", async ({ page }) => {
    const login = new LoginPage(page);
    await login.goto();
    await login.login(testUsers.validVoter.regNo, testUsers.validVoter.password);

    await expect(page).toHaveURL(/\/face-recognition|\/change-password/);
  });

  test("empty fields show an inline error and do not navigate away", async ({ page }) => {
    const login = new LoginPage(page);
    await login.goto();
    await login.loginButton.click(); // click with nothing filled in

    await login.expectErrorContaining("Please fill in all fields");
    await expect(page).toHaveURL(/\/student-login/);
  });

  test("invalid credentials show an error", async ({ page }) => {
    const login = new LoginPage(page);
    await login.goto();
    await login.login(testUsers.invalid.regNo, testUsers.invalid.password);

    await login.expectErrorContaining("Invalid");
  });

  test("short password does not cause a server error [regresses logged High-severity bug]", async ({ page }) => {
    const login = new LoginPage(page);
    await login.goto();
    await login.login(testUsers.validVoter.regNo, shortPassword);

    // The original logged bug: a server error instead of a clean message.
    // This just checks we get SOME visible error, not a crash/blank screen.
    await expect(login.errorMessage).toBeVisible();
  });
});
