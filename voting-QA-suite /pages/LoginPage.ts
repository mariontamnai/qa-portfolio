import { Page, Locator, expect } from "@playwright/test";

/**
 * Page Object for the student login page (frontend/src/pages/StudentLogin.jsx).
 *
 * Real flow confirmed from source: reg number + password -> on success,
 * redirects to /face-recognition (or /change-password on first login).
 * There is no email/OTP step -- an earlier draft of this file assumed one
 * incorrectly.
 */
export class LoginPage {
  readonly page: Page;
  readonly regNoInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly errorMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.regNoInput = page.getByTestId("login-regno-input");
    this.passwordInput = page.getByTestId("login-password-input");
    this.loginButton = page.getByTestId("login-submit-button");
    // StudentLogin.jsx renders the error inline with no data-testid yet.
    // TODO: confirm selector -- add data-testid="login-error-message" to
    // the <div> wrapping the warning error text, then this locator will work.
    this.errorMessage = page.getByTestId("login-error-message");
  }

  async goto() {
    await this.page.goto("/student-login");
  }

  async login(regNo: string, password: string) {
    await this.regNoInput.fill(regNo);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  async expectErrorContaining(text: string) {
    await expect(this.errorMessage).toBeVisible();
    await expect(this.errorMessage).toContainText(text);
  }
}
