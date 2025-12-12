'use server';

import { cookies } from 'next/headers';

import { ApiClient } from '@/core/api/api-client';
import { UnauthorizedError } from '@/core/errors/unauthorized';
import { ValidationError } from '@/core/errors/validation';
import { ServerError } from '@/core/errors/server';

type CreateAccountActionState = { id?: string } & (
  | { success?: true }
  | { success?: false; error?: string }
);

export async function createAccountAction(
  _: CreateAccountActionState,
  formData: FormData,
): Promise<CreateAccountActionState> {
  const userId = formData.get('userId')?.toString() ?? '';
  const parentId = formData.get('parentId')?.toString();
  const type = formData.get('accountType')?.toString() ?? '';

  if (userId.trim().length === 0 || type.trim().length === 0)
    throw new ValidationError();

  const parentAccountId = parentId?.trim().length === 0 ? null : parentId;

  try {
    const token = (await cookies()).get('token')?.value;

    if (!token) {
      throw new UnauthorizedError();
    }

    const api = ApiClient.instance;
    api.request('/api/Accounts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ userId, parentAccountId, type }),
    });

    return { id: Date.now().toString(), success: true };
  } catch (err) {
    let error =
      'An error occured while creating new account. Please try again later.';

    if (err instanceof ValidationError) {
      error = 'Please check your inputs and try again.';
    } else if (err instanceof ServerError) {
      error = 'Could not connect to the server. Please try again later.';
    }

    return { success: false, error };
  }
}
