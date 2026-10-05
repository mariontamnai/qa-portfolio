import { test, expect, Page } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { VotePage } from "../pages/VotePage";
import { testUsers } from "../fixtures/test-data";

/**
 * CastVote.jsx only checks that sessionStorage has "user" and "token" set
 * -- it does not separately verify a face-scan flag. So instead of faking
 * sessionStorage (which fails because the real backend rejects a fake
 * token with 401 when fetching candidates), we log in for real through
 * the UI to get a genuine token, then skip straight to /vote instead of
 * going through the actual face-recognition camera step.
 */
async function loginAsRealVoter(page: Page, regNo: string, password: string) {
  const login = new LoginPage(page);
  await login.goto();
  await login.login(regNo, password);
  // Login triggers an async redirect to /face-recognition (or
  // /change-password). Wait for THAT to actually land before we force-
  // navigate to /vote, otherwise our goto races the app's own redirect
  // and the page can end up in a broken in-between state.
  await page.waitForURL(/\/face-recognition|\/change-password/, { timeout: 10_000 });
}

test.describe("Vote casting", () => {
  test("voter can select a candidate for the current position", async ({ page }) => {
    await loginAsRealVoter(page, testUsers.validVoter.regNo, testUsers.validVoter.password);
    const vote = new VotePage(page);
    await page.goto("/vote");

    await expect(vote.submitButton).toBeDisabled();

    // TODO: replace with a real candidate name from your seeded election data.
    await vote.selectCandidate("Mary Wanjiku");
    await expect(vote.selectionConfirmation).toBeVisible();
    await expect(vote.submitButton).toBeEnabled();
  });

  test("submit button stays disabled until a candidate is selected", async ({ page }) => {
    await loginAsRealVoter(page, testUsers.validVoter.regNo, testUsers.validVoter.password);
    const vote = new VotePage(page);
    await page.goto("/vote");

    await expect(vote.submitButton).toBeDisabled();
  });

  test("a voter who already voted is redirected away from the ballot", async ({ page }) => {
    await loginAsRealVoter(page, testUsers.alreadyVoted.regNo, testUsers.alreadyVoted.password);
    await page.goto("/vote");

    const vote = new VotePage(page);
    await vote.expectRedirectedToAlreadyVoted();
  });

  test("a user with no session is redirected to login", async ({ page }) => {
    await page.goto("/vote");
    await expect(page).toHaveURL(/\/student-login/);
  });
});