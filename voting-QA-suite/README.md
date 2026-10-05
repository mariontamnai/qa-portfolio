# Secure Biometric Voting System: Playwright E2E Suite

End-to-end test suite for the [JKUAT Secure Biometric Voting System](https://jkuat-online-voting-sysstem.netlify.app), built with **Playwright** and **TypeScript** using the **Page Object Model (POM)** pattern. It sits alongside my existing Cypress, Postman and Jest suites in this repository.

## Current status

| Area | Status | Result |
| --- | --- | --- |
| Student login | Done | 4/4 passing |
| Voting flow | Mostly done | 3/4 passing (1 blocked, needs a second real test account) |
| Admin dashboard | In progress | Waiting on `data-testid` attributes and an admin OTP test strategy |
| CI (GitHub Actions) | Planned | Not yet running |
| Database / SQL validation | Planned | Not started |

All results are from runs against the live deployed site.

## What the suite covers

- **Critical path:** login, then cast a vote per position, then final submission.
- **Security-relevant checks:** a user who has already voted can't reach the ballot again, and a non-admin can't reach `/admin/dashboard`.
- **Edge cases:** empty login fields, a short password (ties back to a High-severity bug I logged manually), and submitting with no candidate selected.

**Out of scope:** face-recognition accuracy (a model-evaluation concern, not UI/E2E), load testing, and API testing (covered in the separate Postman collection).

## Design decisions

| Decision | Reason |
| --- | --- |
| Page Object Model | Keeps selectors and page logic out of test files, so a selector change is fixed in one place. |
| `fixtures/test-data.ts` | Centralizes test accounts (this app logs in with a Registration Number) so tests don't hardcode values. Credentials are placeholders and must be supplied locally. |
| Seeding `sessionStorage` in `voting.spec.ts` | The ballot sits behind a real webcam face scan, which isn't practical to automate. A seeded session lets the voting tests focus on the voting flow; login is covered by `auth.spec.ts`. |
| Multi-project config (`chromium`, `mobile-chrome`) | Covers desktop and responsive layouts. |

## Known limitations and next steps

- **Selectors:** `data-testid` attributes exist on the student login page. Still needed on the candidate cards, admin login and the admin dashboard stats. Each spot is marked `// TODO: confirm selector` in the matching `pages/*.ts` file.
- **Admin OTP:** admin login emails a real one-time code. Automating the dashboard tests needs either a non-production test-OTP flag or reading the code from a test inbox.
- **Blocked voting test:** needs a second real test account.
- **CI:** add a GitHub Actions workflow that runs the suite on every push and uploads the HTML report.
- **Database validation:** verify that vote counts shown on the admin dashboard match what was cast.

## Project structure

```
voting-QA-suite/
├── playwright.config.ts
├── pages/
│   ├── LoginPage.ts        (student login)
│   ├── VotePage.ts         (multi-position ballot)
│   └── AdminPage.ts        (admin login + dashboard)
├── tests/
│   ├── auth.spec.ts
│   ├── voting.spec.ts
│   └── admin-dashboard.spec.ts   (in progress)
└── fixtures/
    └── test-data.ts
```

## Running it locally

```bash
npm install
npx playwright install --with-deps
npx playwright test              # run headless
npx playwright test --ui         # interactive mode
npx playwright show-report       # view the HTML report after a run
```

Before running, open `fixtures/test-data.ts` and replace the placeholder values with valid test accounts.
