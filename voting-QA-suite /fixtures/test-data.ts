/**
 * Central place for test users and vote payloads.
 * Real credentials come from environment variables and are never committed.
 * The fallback values below are placeholders only.
 */

export const testUsers = {
  validVoter: {
    regNo: process.env.TEST_VOTER_REGNO || "TEST-VOTER-REGNO",
    password: process.env.TEST_VOTER_PASSWORD || "change-me",
  },
  alreadyVoted: {
    regNo: process.env.TEST_VOTED_REGNO || "TEST-VOTED-REGNO",
    password: process.env.TEST_VOTED_PASSWORD || "change-me",
  },
  admin: {
    adminId: process.env.TEST_ADMIN_ID || "test-admin-id",
    password: process.env.TEST_ADMIN_PASSWORD || "change-me",
  },
  invalid: {
    regNo: "SCT999-9999/9999",
    password: "wrongpassword",
  },
};

// Mirrors the High-severity bug already logged manually: server error on
// short password input. Keeping it here means the regression test and the
// original bug report use the exact same input.
export const shortPassword = "123";