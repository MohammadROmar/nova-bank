'use server';

import { cookies } from 'next/headers';
import { revalidatePath } from 'next/cache';

import { UnauthorizedError } from '@/core/errors/unauthorized';
import { ServerError } from '@/core/errors/server';

type ChangeTransactionStatusState = {
  id?: string;
} & ({ success?: true } | { success?: false; error?: string });

export async function changeTransactionStatus(
  id: number,
  _: ChangeTransactionStatusState,
  formData: FormData,
): Promise<ChangeTransactionStatusState> {
  const status = formData.get('status')?.toString() ?? '';

  try {
    const token = (await cookies()).get('token')?.value;
    if (!token) throw new UnauthorizedError();

    await fetch(
      `${process.env.BACKEND_BASE_URL}/api/Transactions/${id}/ChangeStatus`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ newStatus: status }),
      },
    );

    revalidatePath('/dashboard/transactions', 'layout');
    revalidatePath(`/dashboard/transactions/${id}`);

    return { id: Date.now().toString(), success: true };
  } catch (err) {
    let error =
      'An error occured while creating new account. Please try again later.';

    if (err instanceof UnauthorizedError) {
      error =
        'You are unauthorized to change the status. Check your session and try again.';
    } else if (err instanceof ServerError) {
      error = 'Could not connect to the server. Please try again later.';
    }

    return { success: false, error };
  }
}
