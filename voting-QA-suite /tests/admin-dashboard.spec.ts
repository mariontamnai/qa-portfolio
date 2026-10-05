import { test, expect } from "@playwright/test";
import { AdminLoginPage, AdminDashboardPage } from "../pages/AdminPage";
import { testUsers } from "../fixtures/test-data";

/**
 * Admin login sends a REAL one-time password to the admin's email
 * (AdminLogin.jsx -> verifyAdminOtp). There's no fixed/bypass OTP visible
 * in the frontend code, so fully automating this end-to-end needs one of:
 *   1. A nonprod backend flag that accepts a fixed test OTP, or
 *   2. Reading the OTP from a test inbox (e.g. via an email API/connector).
 * Neither exists yet, so the OTP-entry step below is marked TODO rather
 * than guessed at. The access-control test doesn't need to get past OTP,
 * so it's written and ready to run as-is.
 */

test.describe("Admin access control", () => {
  test("a non-admin visiting /admin/dashboard directly is redirected away", async ({ page }) => {
    await page.goto("/admin/dashboard");

    const dashboard = new AdminDashboardPage(page);
    await dashboard.expectNonAdminRedirected();
  });

  test("admin login accepts credentials and moves to the OTP step", async ({ page }) => {
    const adminLogin = new AdminLoginPage(page);
    await adminLogin.goto();
    await adminLogin.login(testUsers.admin.adminId, testUsers.admin.password);

    await expect(adminLogin.otpInput).toBeVisible();
  });

  // TODO: once a nonprod OTP bypass exists, add:
  // test("admin reaches dashboard after OTP and sees totalVotes", async ({ page }) => { ... });
});
