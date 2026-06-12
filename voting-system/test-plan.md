# Voting System — Test Plan

## Project Overview
A secure web-based voting platform for JKUAT integrating biometric 
face recognition and JWT authentication.

**Frontend repo:** [jkuat-voting-system](https://github.com/mariontamnai/jkuat-voting-system)  
**Backend repo:** [Secure-online-voting-system](https://github.com/MiriamRehema/Secure-online-voting-system)  
**Live demo:** [Live on Netlify](https://jkuat-online-voting-sysstem.netlify.app/)

---

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
| TC-001 | Login | Valid login | 1. Go to login page 2. Enter valid credentials 3. Click login | User is redirected to voting page | Not tested |
| TC-002 | Login | Invalid password | 1. Enter valid email 2. Enter wrong password 3. Click login | Error message is shown | Not tested |
| TC-003 | Login | Empty fields | 1. Leave email and password empty 2. Click login | Validation error shown | Not tested |
| TC-004 | Voting | Submit a vote | 1. Login 2. Select a candidate 3. Click vote | Vote is recorded, confirmation shown | Not tested |
| TC-005 | Voting | Duplicate vote | 1. Login 2. Vote once 3. Try to vote again | System blocks second vote | Not tested |
| TC-006 | Biometric | Face verification | 1. Login 2. Face scan triggered 3. Show valid face | User is verified and proceeds | Not tested |
| TC-007 | Biometric | Wrong face | 1. Login 2. Show wrong/different face | Access denied, error shown | Not tested |
| TC-008 | Admin | View results | 1. Login as admin 2. Go to dashboard | Real-time results are displayed | Not tested |
