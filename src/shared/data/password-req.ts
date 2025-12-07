export const REQUIREMENTS = [
  {
    key: 'hasUpper',
    label: 'Has uppercase letter',
    test: (value: string) => /[A-Z]/.test(value),
  },
  {
    key: 'hasLower',
    label: 'Has lowercase letter',
    test: (value: string) => /[a-z]/.test(value),
  },
  {
    key: 'hasNumber',
    label: 'Has a number',
    test: (value: string) => /[0-9]/.test(value),
  },
  {
    key: 'hasSpecial',
    label: 'Has special character',
    test: (value: string) => /[^A-Za-z0-9]/.test(value),
  },
  {
    key: 'length',
    label: 'Has at least 8 characters',
    test: (value: string) => value.length >= 8,
  },
];
