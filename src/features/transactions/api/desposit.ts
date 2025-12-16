'use server';

import { cookies } from 'next/headers';
import { revalidatePath } from 'next/cache';

import { ServerError } from '@/core/errors/server';
import { UnauthorizedError } from '@/core/errors/unauthorized';
import { TransactionsFacade } from '@/core/facades/transactions';

type DepositState = { id?: string } & (
  | { success?: true }
  | { success?: false; error?: string }
);

export async function depositAction(
  accountId: number,
  _: DepositState,
  formData: FormData,
): Promise<DepositState> {
  const amount = formData.get('amount')?.toString() ?? '';

  const amountASNumber = +amount;

  if (isNaN(amountASNumber) || amountASNumber <= 0) {
    return { success: false, error: 'Please enter a valid amount' };
  }

  try {
    const token = (await cookies()).get('token')?.value;

    if (!token) throw new UnauthorizedError();

    await TransactionsFacade.deposit(amountASNumber, accountId, token);

    revalidatePath(`/dashboard/accounts/${accountId}/transactions/deposit`);
    return { id: Date.now().toString(), success: true };
  } catch (err) {
    let error = 'An error occured depositing. Please try again later.';

    if (err instanceof UnauthorizedError) {
      error = 'Unauthorized - Please check your session and try again.';
    } else if (err instanceof ServerError) {
      error = 'Could not connect to the server. Please try again later.';
    }

    return { success: false, error };
  }
}
