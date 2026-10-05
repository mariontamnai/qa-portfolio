# Secure Biometric Voting System — Playwright E2E Suite

Automated end-to-end test suite for the JKUAT Secure Biometric Voting System
(https://jkuat-online-voting-sysstem.netlify.app), built with Playwright and
TypeScript, running on GitHub Actions CI.

This suite is structured using the **Page Object Model (POM)** pattern,
alongside the existing Cypress suite, to build the framework currently in
higher demand for mid-level QA roles.

## What's actually implemented vs. what's a TODO

This was built by reading the real source in
`frontend/src/pages/StudentLogin.jsx`, `CastVote.jsx`, `AdminLogin.jsx`,
and `admin/Dashboard.jsx` — not guessed. Two things are genuinely blocked
until you do a small amount of setup:

1. **`data-testid` attributes** — added to `StudentLogin.jsx` already.
   Still needed on `CastVote.jsx` / `CandidateCard.jsx` (candidate cards),
   `AdminLogin.jsx` (admin fields), and `admin/Dashboard.jsx` (the
   totalVotes stat card). Each spot is marked `// TODO: confirm selector`
   in the relevant `pages/*.ts` file.
2. **Admin OTP** — `AdminLogin.jsx` emails a real one-time code with no
   visible bypass in the frontend. Fully automating the admin dashboard
   tests needs either a nonprod backend flag that accepts a fixed test
   OTP, or reading the code from a test inbox. Until then,
   `admin-dashboard.spec.ts` only covers what doesn't require getting past
   OTP.

## Why this structure

| Decision | Reason |
|---|---|
| Page Object Model | Keeps selectors and page logic out of test files. Update a selector once, not in every test. |
| `fixtures/test-data.ts` | Centralizes test accounts (reg numbers, not emails — this app logs in with a Registration Number) so tests don't hardcode values. |
| Seeding `sessionStorage` directly in `voting.spec.ts` | `CastVote.jsx` sits behind a real webcam face scan, which isn't practical to automate. Seeding a fake logged-in session lets the voting tests focus on the voting flow itself, not re-prove login works (that's already `auth.spec.ts`'s job). |
| Multi-project config (`chromium`, `mobile-chrome`) | Demonstrates cross-browser/responsive coverage, not just one desktop run. |
| GitHub Actions workflow | Runs the suite on every push/PR — shows testing is wired into delivery, not a manual afterthought. |

## Test strategy

**Scope**: student login, the multi-position voting ballot, and admin
access control.

**Out of scope for this suite**: face-recognition matching accuracy itself
(a model-evaluation concern, not a UI/E2E concern), load/performance
testing (tracked separately), and the existing Postman API suite (kept in
its own collection since it hits endpoints directly).

**Risk-based prioritization**:
1. **Critical path** — login → cast vote per position → final submission
2. **Security-relevant** — an already-voted user can't reach the ballot again; a non-admin can't reach `/admin/dashboard`
3. **Edge cases** — empty login fields, short password (ties back to the High-severity bug already logged manually), submitting with no candidate selected

**Exit criteria**: all implemented tests passing on `chromium` +
`mobile-chrome` before merge to `main`.

## Project structure

```
voting-qa-suite/
├── playwright.config.ts
├── pages/
│   ├── LoginPage.ts        (student login)
│   ├── VotePage.ts         (multi-position ballot)
│   └── AdminPage.ts        (admin login + dashboard)
├── tests/
│   ├── auth.spec.ts
│   ├── voting.spec.ts
│   └── admin-dashboard.spec.ts
├── fixtures/
│   └── test-data.ts
└── .github/workflows/playwright.yml
```

## Setup

```bash
npm install
npx playwright install --with-deps
npx playwright test              # run headless
npx playwright test --ui         # interactive mode — recommended while
                                  # you're still adding data-testid attrs
npx playwright show-report       # view HTML report after a run
```

## CI

Every push and pull request triggers `.github/workflows/playwright.yml`,
which installs dependencies, runs the full suite headless across both
configured projects, and uploads the HTML report as a build artifact.

## Next steps to extend this

- Finish adding `data-testid` attributes to `CastVote.jsx` /
  `CandidateCard.jsx`, `AdminLogin.jsx`, and `admin/Dashboard.jsx` (same
  pattern already done in `StudentLogin.jsx`).
- Decide on an admin-OTP test strategy (nonprod bypass flag vs. test
  inbox) so `admin-dashboard.spec.ts` can be completed.
- Add a test that queries the database directly to verify vote counts
  shown on the admin dashboard actually match what was cast (the
  SQL/backend-validation skill that's a common junior-to-mid gap).
- Add a `k6` load test script in a `perf/` folder to smoke-test the voting
  endpoint under concurrent load.
