import { Metadata } from 'next';
import { notFound } from 'next/navigation';

import DepositForm from '@/features/transactions/components/deposit-form';
import { getAccount } from '@/features/accounts/api/get-accounts';
import { Account } from '@/features/accounts/models/accounts';

export const metadata: Metadata = { title: 'Deposit' };

type Props = { params: Promise<{ id: string }> };

async function DepositPage({ params }: Props) {
  const { id } = await params;

  let account: Account | null = null;

  try {
    account = await getAccount(id);
  } catch {
    return notFound();
  }

  return <DepositForm account={account} />;
}

export default DepositPage;
