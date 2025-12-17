'use server';

import { cookies } from 'next/headers';
import { revalidatePath } from 'next/cache';

import { TransactionsFacade } from '@/core/facades/transactions';
import { UnauthorizedError } from '@/core/errors/unauthorized';
import { Transaction } from '../models/transaction';
import { ServerError } from '@/core/errors/server';

type WithdrawState = { id?: string } & (
  | { success?: true; transaction?: Transaction }
  | { success?: false; error?: string }
);

export async function withdrawAction(
  accountId: number,
  _: WithdrawState,
  formData: FormData,
): Promise<WithdrawState> {
  const amount = formData.get('amount')?.toString() ?? '';
  const amountASNumber = +amount;

  if (isNaN(amountASNumber) || amountASNumber <= 0) {
    return { success: false, error: 'Please enter a valid amount' };
  }

  try {
    const token = (await cookies()).get('token')?.value;

    if (!token) throw new UnauthorizedError();

    const transaction = await TransactionsFacade.withdraw(
      accountId,
      amountASNumber,
      token,
    );

    revalidatePath(`/dashboard/accounts/${accountId}/transactions/withdraw`);
    return { id: Date.now().toString(), success: true, transaction };
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
