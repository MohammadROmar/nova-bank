import { validateEmail } from './email';
import { validatePassword } from './password';

export function validateLoginInput(email: string, password: string) {
  const emailError = validateEmail(email);
  if (emailError) return emailError;

  const passwordError = validatePassword(password);
  if (passwordError) return passwordError;

  return null;
}
