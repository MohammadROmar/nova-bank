import { Metadata } from 'next';
import { notFound } from 'next/navigation';

import TransferForm from '@/features/transactions/components/transfer-form';
import { getAccount } from '@/features/accounts/api/get-accounts';
import { Account } from '@/features/accounts/models/accounts';

export const metadata: Metadata = { title: 'Transfer' };

type Props = { params: Promise<{ id: string }> };

async function TransferPage({ params }: Props) {
  const { id } = await params;

  let account: Account | null = null;

  try {
    account = await getAccount(id);
  } catch {
    return notFound();
  }
  return <TransferForm account={account} />;
}

export default TransferPage;
