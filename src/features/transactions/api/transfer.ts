'use server';

import { cookies } from 'next/headers';
import { revalidatePath } from 'next/cache';

import { TransactionsFacade } from '@/core/facades/transactions';
import { ServerError } from '@/core/errors/server';
import { UnauthorizedError } from '@/core/errors/unauthorized';
import type { ActionState } from '../models/action-state';

export async function transferAction(
  accountId: number,
  _: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const amount = formData.get('amount')?.toString() ?? '';
  const toAccountId = formData.get('toAccountId')?.toString() ?? '';

  const amountASNumber = +amount;
  const toAccountIdAsNumber = +toAccountId;

  if (
    isNaN(amountASNumber) ||
    amountASNumber <= 0 ||
    isNaN(toAccountIdAsNumber)
  ) {
    return {
      success: false,
      error: 'make sure to enter a valid amount and account',
    };
  }

  try {
    const token = (await cookies()).get('token')?.value;

    if (!token) throw new UnauthorizedError();

    const transaction = await TransactionsFacade.transfer(
      accountId,
      toAccountIdAsNumber,
      amountASNumber,
      token,
    );

    revalidatePath(`/dashboard/accounts/${accountId}/transactions/transfer`);
    return { id: Date.now().toString(), success: true, transaction };
  } catch (err) {
    let error = 'An error occured transfering. Please try again later.';

    if (err instanceof UnauthorizedError) {
      error = 'Unauthorized - Please check your session and try again.';
    } else if (err instanceof ServerError) {
      error = 'Could not connect to the server. Please try again later.';
    }

    return { success: false, error };
  }
}
