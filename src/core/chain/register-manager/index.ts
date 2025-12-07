import { ValidationError } from '@/core/errors/validation';
import { ApiClient } from '@/core/api/api-client';
import { validateEmail } from '../../validation/email';
import { validatePassword } from '../../validation/password';
import { validateText } from '../../validation/text';
import { validatePhoneNumber } from '../../validation/phone-number';
import { cookies } from 'next/headers';
import { UnauthorizedError } from '@/core/errors/unauthorized';

abstract class BaseHandler {
  protected next: BaseHandler | null = null;

  setNext(handler: BaseHandler) {
    this.next = handler;
    return handler;
  }

  async handle(req: any): Promise<any> {
    if (this.next) return this.next.handle(req);
  }
}

class RegisterValidationHandler extends BaseHandler {
  async handle(req: {
    username: string;
    email: string;
    password: string;
    phoneNumber: string;
  }) {
    if (!req.username || !req.email || !req.password || !req.phoneNumber) {
      throw new ValidationError('All fields are required');
    }

    const usernameErr = validateText(req.username);
    if (usernameErr) throw new ValidationError(usernameErr);

    const emailErr = validateEmail(req.email);
    if (emailErr) throw new ValidationError(emailErr);

    const passErr = validatePassword(req.password);
    if (passErr) throw new ValidationError(passErr);

    const phoneNumberErr = validatePhoneNumber(req.phoneNumber);
    if (phoneNumberErr) throw new ValidationError(phoneNumberErr);

    return super.handle(req);
  }
}

class RegisterManagerBackendHandler extends BaseHandler {
  async handle(req: {
    username: string;
    email: string;
    password: string;
    phone: string;
  }) {
    const token = (await cookies()).get('token');

    if (!token) {
      throw new UnauthorizedError();
    }

    const api = ApiClient.instance;
    return api.request('/users/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ ...req, role: 'Manager' }),
    });
  }
}

export function buildRegisterManagerChain() {
  const validationHandler = new RegisterValidationHandler();
  const backendHandler = new RegisterManagerBackendHandler();

  validationHandler.setNext(backendHandler);

  return validationHandler;
}
