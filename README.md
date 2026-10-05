# QA Portfolio — Marion Tamnai

QA Engineer with a frontend development background. This repository contains test plans, bug reports, and manual, API, and automated UI test suites for my personal projects.

📍 Nairobi, Kenya · 📧 mariontamnai@gmail.com · 🔗 [GitHub](https://github.com/mariontamnai)

---

## Projects Tested

### 1. JKUAT Secure Biometric Voting System
A secure web-based voting platform with biometric face recognition and JWT authentication, deployed live on Netlify. Built by me and tested by me.

**Stack:** React, Node.js, Express, MongoDB, Face Recognition API, JWT

| Area | Result |
|---|---|
| Manual testing | 8 test cases executed, all passing (login, biometric verification, vote submission, duplicate-vote prevention) |
| Bug reporting | 3 bugs documented with severity, steps to reproduce, expected vs. actual, and verified fixes |
| API testing | 23 automated Postman tests across 10 endpoints |
| UI automation (Playwright) | Login flow: 4/4 passing · Voting flow: 3/4 passing (1 blocked, needs a second test account) |
| UI automation (Cypress) | 21 E2E tests across 4 spec files |

**Tools:** Manual Testing, Chrome DevTools, Postman, Playwright + TypeScript (Page Object Model), Cypress

**Notable bugs found**
- **High:** server error on short password input
- **Medium:** sensitive fields exposed in an API response

📋 [Test Plan](https://github.com/mariontamnai/qa-portfolio/blob/main/voting-system/test-plan.md) · 🐛 [Bug Reports](https://github.com/mariontamnai/qa-portfolio/tree/main/voting-system/bug-reports) · 📬 [Postman Collection](https://github.com/mariontamnai/qa-portfolio/blob/main/voting-system/postman/voting-system-api-tests.json) · 🎭 [Playwright Tests](https://github.com/mariontamnai/qa-portfolio/tree/main/voting-QA-suite) · 🌲 [Cypress Tests](https://github.com/mariontamnai/qa-portfolio/tree/main/cypress/e2e/voting-system)

---

## Skills

| Area | Tools | Status |
|---|---|---|
| Manual testing | Test plans, bug reports, exploratory testing | ✅ |
| API testing | Postman | ✅ |
| UI automation | Playwright + TypeScript (POM) | ✅ Login and voting flows |
| UI automation | Cypress | ✅ |
| Unit testing | Jest | ✅ |
| CI/CD | GitHub Actions | 🔧 In progress |
| Admin dashboard tests | Playwright | 🔧 In progress |
| Database validation | SQL | 📚 Learning |
| Performance testing | k6 | 📚 Learning |

---

## Currently Working On
- Wiring the Playwright suite into GitHub Actions so it runs on every push
- Adding admin dashboard coverage
- Learning SQL for backend data validation

---

## About Me
Frontend developer (React, Next.js, Angular) moving into QA Engineering, with a focus on web and API testing. Diploma in Information Technology, JKUAT (2026).
