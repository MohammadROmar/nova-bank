'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import { AuthFacade } from '@/core/facades/auth';
import { ValidationError } from '@/core/errors/validation';
import { UnauthorizedError } from '@/core/errors/unauthorized';
import { HttpError } from '@/core/errors/http';

type LoginInputs = { email: string; password: string };
type LoginActionState = LoginInputs &
  ({ success?: true } | { success?: false; error?: string });

export async function loginAction(
  _: LoginInputs,
  formData: FormData,
): Promise<LoginActionState> {
  const email = formData.get('email')?.toString() || '';
  const password = formData.get('password')?.toString() || '';

  try {
    const result = await AuthFacade.login(email, password);

    if (!['Administrator', 'Manager'].includes(result.role)) {
      throw new UnauthorizedError();
    }

    const cookieStore = await cookies();

    cookieStore.set({
      name: 'token',
      value: result.token,
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      path: '/',
      maxAge: result.expires * 60,
    });
    cookieStore.set({
      name: 'refresh_token',
      value: result.refreshToken,
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      path: '/',
      maxAge: 60 * 60 * 24 * 2,
    });
  } catch (err) {
    let error =
      'Please check your email and password or check internet internet or try again later.';
    if (err instanceof ValidationError) {
      error = 'Invalid email or password.';
    } else if (err instanceof UnauthorizedError) {
      error = 'Unauthorized - check credentials.';
    } else if (err instanceof HttpError && err.status === 500) {
      error = 'Server error. Please try again later.';
    }

    return { success: false, error, email, password };
  }

  redirect('/dashboard');
}
