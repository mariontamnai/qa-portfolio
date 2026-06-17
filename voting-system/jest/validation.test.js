// Validation logic extracted from the voting system

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const regNumberRegex = /^[a-zA-Z]{2,5}\d{3}-\d{4}\/\d{4}$/i;
const passwordMinLength = 8;

const validateEmail = (email) => emailRegex.test(email);
const validateRegNumber = (regNumber) => regNumberRegex.test(regNumber);
const validatePassword = (password) => password.length >= passwordMinLength;
const validateLoginFields = (regNumber, password) => {
  if (!regNumber || !password) return 'Please fill in all fields';
  return null;
};

// ── Email validation tests ──
describe('Email Validation', () => {
  test('valid email passes', () => {
    expect(validateEmail('marion@gmail.com')).toBe(true);
  });

  test('email without @ fails', () => {
    expect(validateEmail('mariongmail.com')).toBe(false);
  });

  test('email without domain fails', () => {
    expect(validateEmail('marion@')).toBe(false);
  });

  test('empty email fails', () => {
    expect(validateEmail('')).toBe(false);
  });
});

// ── Registration number validation tests ──
describe('Registration Number Validation', () => {
  test('valid registration number passes', () => {
    expect(validateRegNumber('SCT121-0517/2024')).toBe(true);
  });

  test('registration number without slash fails', () => {
    expect(validateRegNumber('SCT121-05172024')).toBe(false);
  });

  test('empty registration number fails', () => {
    expect(validateRegNumber('')).toBe(false);
  });
});

// ── Password validation tests ──
describe('Password Validation', () => {
  test('password with 8+ characters passes', () => {
    expect(validatePassword('MillWhite!12')).toBe(true);
  });

  test('password with less than 8 characters fails', () => {
    expect(validatePassword('abc')).toBe(false);
  });

  test('empty password fails', () => {
    expect(validatePassword('')).toBe(false);
  });
});

// ── Login field validation tests ──
describe('Login Field Validation', () => {
  test('returns error when both fields are empty', () => {
    expect(validateLoginFields('', '')).toBe('Please fill in all fields');
  });

  test('returns error when password is empty', () => {
    expect(validateLoginFields('SCT121-0517/2024', '')).toBe('Please fill in all fields');
  });

  test('returns null when both fields are filled', () => {
    expect(validateLoginFields('SCT121-0517/2024', 'MillWhite!12')).toBeNull();
  });
});