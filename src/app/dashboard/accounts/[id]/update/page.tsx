import { Metadata } from 'next';
import { notFound } from 'next/navigation';

import PageTitle from '@/features/dashboard/components/page-title';
import UpdateAccountForm from '@/features/accounts/components/update-account-form';
import ChangeAccountState from '@/features/accounts/components/change-account-state';
import { getAccount } from '@/features/accounts/api/get-accounts';
import { Account } from '@/features/accounts/models/accounts';

export const metadata: Metadata = { title: 'Update Account' };

type Props = { params: Promise<{ id: string }> };

async function UpdateAccountPage({ params }: Props) {
  const { id } = await params;

  let account: Account | null = null;
  let parentAccount: Account | null = null;

  try {
    account = await getAccount(id);

    if (account.parentAccountId) {
      parentAccount = await getAccount(account.parentAccountId.toString());
    }
  } catch {
    return notFound();
  }

  return (
    <section>
      <div>
        <PageTitle title="Update Account" />
      </div>

      <UpdateAccountForm account={account} parentAccount={parentAccount} />
      <ChangeAccountState id={account.id} defaultState={account.state} />
    </section>
  );
}

export default UpdateAccountPage;
