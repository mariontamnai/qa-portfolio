import { Page, Locator, expect } from "@playwright/test";

/**
 * Page Objects for the admin flow.
 *
 * Real flow confirmed from source:
 * - AdminLogin.jsx: adminId + password -> a real 6-digit OTP emailed to the
 *   admin -> /admin/dashboard on success. There IS an OTP step here
 *   (unlike student login).
 * - admin/Dashboard.jsx: shows a stats card with `stats.totalVotes`.
 */
export class AdminLoginPage {
  readonly page: Page;
  readonly adminIdInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly otpInput: Locator;
  readonly verifyOtpButton: Locator;

  constructor(page: Page) {
    this.page = page;
    // AdminLogin.jsx has no data-testid yet -- TODO: confirm selector,
    // add data-testid attributes the same way you did in StudentLogin.jsx.
    this.adminIdInput = page.getByTestId("admin-id-input");
    this.passwordInput = page.getByTestId("admin-password-input");
    this.loginButton = page.getByTestId("admin-login-button");
    this.otpInput = page.getByTestId("admin-otp-input");
    this.verifyOtpButton = page.getByTestId("admin-verify-otp-button");
  }

  async goto() {
    await this.page.goto("/admin-login");
  }

  async login(adminId: string, password: string) {
    await this.adminIdInput.fill(adminId);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  async verifyOtp(code: string) {
    await this.otpInput.fill(code);
    await this.verifyOtpButton.click();
  }
}

export class AdminDashboardPage {
  readonly page: Page;
  readonly totalVotesCard: Locator;

  constructor(page: Page) {
    this.page = page;
    // TODO: confirm selector -- add data-testid="total-votes-card" to the
    // stats card in admin/Dashboard.jsx that renders stats.totalVotes.
    this.totalVotesCard = page.getByTestId("total-votes-card");
  }

  async expectLoaded() {
    await expect(this.page).toHaveURL(/\/admin\/dashboard/);
  }

  async expectNonAdminRedirected() {
    await expect(this.page).not.toHaveURL(/\/admin\/dashboard/);
  }
}
