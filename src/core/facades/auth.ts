import { ApiClient } from '../api/api-client';
import { ValidationError } from '../errors/validation';
import { validateLoginInput } from '../validation/login-input';
import { LoginResponse } from '@/features/auth/models/login-response';
import { User } from '@/features/auth/models/user';

export class AuthFacade {
  public static async login(email: string, password: string) {
    const error = validateLoginInput(email, password);
    if (error) throw new ValidationError(error);

    const api = ApiClient.instance;

    return api.request<LoginResponse>('/api/users/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, deviceToken: '' }),
    });
  }

  public static async refreshToken(token: string, refreshToken: string) {
    const api = ApiClient.instance;

    return api.request<LoginResponse>('/api/users/token/refresh', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ refreshToken }),
    });
  }

  public static getCurrentUser(token: string) {
    const api = ApiClient.instance;

    return api.request<User>('/api/users/current', {
      headers: { Authorization: `Bearer ${token}` },
    });
  }
}
