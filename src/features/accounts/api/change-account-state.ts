'use server';

import { cookies } from 'next/headers';
import { revalidatePath } from 'next/cache';

import { ApiClient } from '@/core/api/api-client';
import { UnauthorizedError } from '@/core/errors/unauthorized';
import { ValidationError } from '@/core/errors/validation';
import { ServerError } from '@/core/errors/server';

type ChangeAccountState = { id?: string } & (
  | { success?: true }
  | { success?: false; error?: string }
);

export async function changeAccountState(
  accountId: number,
  _: ChangeAccountState,
  formData: FormData,
): Promise<ChangeAccountState> {
  const newState = formData.get('accountState')?.toString() ?? '';

  if (newState.trim().length === 0) throw new ValidationError();

  try {
    const token = (await cookies()).get('token')?.value;
    if (!token) throw new UnauthorizedError();

    const api = ApiClient.instance;
    await api.request(`/api/Accounts/${accountId}/ChangeState`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ newState }),
    });

    revalidatePath(`dashboard/accounts/${accountId}/update`);
    return { id: Date.now().toString(), success: true };
  } catch (err) {
    let error =
      'An error occured while changing the state. Please try again later.';

    if (err instanceof ValidationError) {
      error = 'Please check your inputs and try again.';
    } else if (err instanceof ServerError) {
      error = 'Could not connect to the server. Please try again later.';
    }

    return { success: false, error };
  }
}
