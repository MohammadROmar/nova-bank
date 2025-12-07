export function validatePhoneNumber(input: string) {
  if (!/^09[0-9]{8}$/.test(input)) {
    return 'Please enter a valid phone number';
  }

  return null;
}
