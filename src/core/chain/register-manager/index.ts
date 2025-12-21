import { cookies } from 'next/headers';

import { ApiClient } from '@/core/api/api-client';
import { ValidationError } from '@/core/errors/validation';
import { UnauthorizedError } from '@/core/errors/unauthorized';
import { validateEmail } from '../../validation/email';
import { validatePassword } from '../../validation/password';
import { validatePhoneNumber } from '../../validation/phone-number';
import { validateText } from '../../validation/text';

type ManagerCredentials = {
  userName: string;
  email: string;
  password: string;
  phoneNumber: string;
};

abstract class BaseHandler {
  protected next: BaseHandler | null = null;

  setNext(handler: BaseHandler) {
    this.next = handler;
    return handler;
  }

  async handle(req: ManagerCredentials): Promise<unknown> {
    if (this.next) return this.next.handle(req);
  }
}

class RegisterManagerValidationHandler extends BaseHandler {
  async handle(req: ManagerCredentials) {
    if (!req.userName || !req.email || !req.password || !req.phoneNumber) {
      throw new ValidationError('All fields are required');
    }

    const usernameErr = validateText(req.userName);
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
  async handle(req: ManagerCredentials) {
    const token = (await cookies()).get('token')?.value;
    if (!token) throw new UnauthorizedError();

    const formData = new FormData();

    formData.append('userName', req.userName);
    formData.append('email', req.email);
    formData.append('password', req.password);
    formData.append('phoneNumber', req.phoneNumber);
    formData.append('role', 'Manager');

    const api = ApiClient.instance;
    const response = await api.request('/api/users/register', {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    });

    return response;
  }
}

export function buildRegisterManagerChain() {
  const validationHandler = new RegisterManagerValidationHandler();
  const backendHandler = new RegisterManagerBackendHandler();

  validationHandler.setNext(backendHandler);

  return validationHandler;
}
