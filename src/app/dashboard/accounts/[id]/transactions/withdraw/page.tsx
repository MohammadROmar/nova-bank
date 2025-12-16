import { Metadata } from 'next';
import { notFound } from 'next/navigation';

import WithdrawForm from '@/features/transactions/components/withdraw-form';
import { getAccount } from '@/features/accounts/api/get-accounts';
import { Account } from '@/features/accounts/models/accounts';

export const metadata: Metadata = { title: 'Withdraw' };

type Props = { params: Promise<{ id: string }> };

async function WithdrawPage({ params }: Props) {
  const { id } = await params;

  let account: Account | null = null;

  try {
    account = await getAccount(id);
  } catch {
    return notFound();
  }

  return <WithdrawForm account={account} />;
}

export default WithdrawPage;
