'use server';

type WithdrawState = { id?: string } & (
  | { success?: true }
  | { success?: false; error?: string }
);

export async function withdrawAction(
  accountId: number,
  _: WithdrawState,
  formData: FormData,
): Promise<WithdrawState> {
  const amount = formData.get('amount')?.toString() ?? '';

  return { success: false };
}
