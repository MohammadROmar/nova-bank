export function validateText(input: string) {
  if (!input || input.trim().length === 0) {
    return 'Please enter a valid value';
  }

  return null;
}
