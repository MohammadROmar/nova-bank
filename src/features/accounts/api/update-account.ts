'use server';

import { cookies } from 'next/headers';
import { revalidatePath } from 'next/cache';

import { ApiClient } from '@/core/api/api-client';
import { UnauthorizedError } from '@/core/errors/unauthorized';
import { ValidationError } from '@/core/errors/validation';
import { ServerError } from '@/core/errors/server';

type UpdateAccountActionState = { id?: string } & (
  | { success?: true }
  | { success?: false; error?: string }
);

export async function updateAccountAction(
  accountId: string,
  _: UpdateAccountActionState,
  formData: FormData,
): Promise<UpdateAccountActionState> {
  const parentId = formData.get('parentId')?.toString();
  const type = formData.get('accountType')?.toString() ?? '';

  if (type.trim().length === 0) throw new ValidationError();

  const parentAccountId = parentId
    ? parentId?.trim().length === 0
      ? null
      : parentId
    : null;

  try {
    const token = (await cookies()).get('token')?.value;
    if (!token) throw new UnauthorizedError();

    const api = ApiClient.instance;
    api.request(`/api/Accounts/${accountId}/Update`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ type, parentAccountId }),
    });

    revalidatePath(`dashboard/accounts/${accountId}/update`);
    return { id: Date.now().toString(), success: true };
  } catch (err) {
    let error =
      'An error occured while updating the account. Please try again later.';

    if (err instanceof ValidationError) {
      error = 'Please check your inputs and try again.';
    } else if (err instanceof ServerError) {
      error = 'Could not connect to the server. Please try again later.';
    }

    return { success: false, error };
  }
}
