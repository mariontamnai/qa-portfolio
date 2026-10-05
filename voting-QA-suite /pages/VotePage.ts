import { Page, Locator, expect } from "@playwright/test";

/**
 * Page Object for the multi-position ballot (frontend/src/pages/CastVote.jsx).
 *
 * Real flow confirmed from source: candidates are grouped by "position"
 * (e.g. faculty rep, treasurer). The voter picks one candidate per
 * position, submits, and the page automatically advances to the next
 * position until all positions are voted, then redirects to
 * /vote-submitted. A voter who has already voted never reaches this page
 * -- CastVote.jsx redirects them straight to /vote-submitted before
 * candidates even load, so "duplicate vote prevention" is tested as a
 * redirect, not an on-page warning.
 */
export class VotePage {
  readonly page: Page;
  readonly submitButton: Locator;
  readonly selectionConfirmation: Locator;
  readonly positionHeading: Locator;

  constructor(page: Page) {
    this.page = page;
    // CandidateCard.jsx has no data-testid yet -- TODO: confirm selector,
    // add data-testid="candidate-card" to the outer <div> in
    // frontend/src/components/CandidateCard.jsx.
    this.submitButton = page.getByTestId("submit-vote-button");
    this.selectionConfirmation = page.getByText("Candidate Selected");
    this.positionHeading = page.locator("h3").first();
  }

  candidateCard(candidateName: string): Locator {
    // Falls back to matching on the candidate's rendered name text, since
    // there's no data-testid per card yet.
    return this.page.locator(".candidate-card", { hasText: candidateName });
  }

  async selectCandidate(candidateName: string) {
    await this.candidateCard(candidateName).click();
  }

  async submitAndAdvance() {
    await this.submitButton.click();
  }

  async expectRedirectedToAlreadyVoted() {
    // Covers the "duplicate vote prevention" case for an account that has
    // already voted -- CastVote.jsx bounces them before rendering candidates.
    await expect(this.page).toHaveURL(/\/vote-submitted/);
  }

  async expectFinalConfirmation() {
    await expect(this.page).toHaveURL(/\/vote-submitted/);
  }
}
