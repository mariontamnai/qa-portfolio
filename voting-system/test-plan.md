# Voting System — Test Plan

## Project Overview
A secure web-based voting platform for JKUAT integrating biometric 
face recognition and JWT authentication.

**Frontend repo:** [jkuat-voting-system](https://github.com/mariontamnai/jkuat-voting-system)  
**Backend repo:** [Secure-online-voting-system](https://github.com/MiriamRehema/Secure-online-voting-system)  
**Live demo:** [Live on Netlify](https://jkuat-online-voting-sysstem.netlify.app/)

---

## Test Environment
| Property | Details |
|----------|---------|
| Browser | Chrome |
| OS | Mac |
| Screen size | Desktop |
| Frontend | Deployed on Netlify |
| Backend | https://secure-online-voting-system-1xj1.onrender.com |
| Test date | June 2026 |
| Tested by | Marion Tamnai |

## Features Being Tested
- User registration and login
- Biometric face recognition verification
- Vote submission
- Duplicate vote prevention
- Admin dashboard
- Results display

---

## Test Cases

| ID | Feature | Test Case | Steps | Expected Result | Status |
|----|---------|-----------|-------|-----------------|--------|
| TC-001 | Login | Valid login | 1. Go to login page 2. Enter valid credentials 3. Click login | User is redirected to voting page | ✅ Pass |
| TC-002 | Login | Invalid password | 1. Enter valid email 2. Enter wrong password 3. Click login | Error message is shown | ✅ Pass |
| TC-003 | Login | Empty fields | 1. Leave email and password empty 2. Click login | Validation error shown | ✅ Pass |
| TC-004 | Voting | Submit a vote | 1. Login 2. Select a candidate 3. Click vote | Vote is recorded, confirmation shown | ✅ Pass |
| TC-005 | Voting | Duplicate vote | 1. Login 2. Vote once 3. Try to vote again | System blocks second vote | ✅ Pass |
| TC-006 | Biometric | Face verification | 1. Login 2. Model loads 3. Camera starts 4. Face detected 5. Click Verify Identity | User is verified and proceeds to voting page | ✅ Pass |
| TC-007 | Biometric | Wrong face | 1. Login 2. Model loads 3. Camera starts 4. Cover/hide face 5. Try to click Verify Identity | Button stays inactive, cannot proceed | ✅ Pass |
| TC-008 | Admin | View results | 1. Login as admin 2. Go to dashboard | Real-time results displayed with live updates | ✅ Pass |


## Notes
- Anonymous users can view live results without logging in. 
  This is intentional — results are public for transparency 
  while voting requires student authentication.

## Bugs Found

| Bug ID | Feature | Severity | Status |
|--------|---------|----------|--------|
| [BUG-001](./bug-reports/BUG-001.md) | Add Student — Password | High | Open |
| [BUG-002](./bug-reports/BUG-002.md) | Add Student — Full Name | Low | Open |
