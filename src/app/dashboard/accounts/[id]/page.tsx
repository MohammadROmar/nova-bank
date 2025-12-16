import { Metadata } from 'next';
import { notFound } from 'next/navigation';

import PageTitle from '@/features/dashboard/components/page-title';
import Detail from '@/features/accounts/components/detail';
import AccountActions from '@/features/accounts/components/account-actions';
import AccountCard from '@/features/accounts/components/account-card';
import { getAccount } from '@/features/accounts/api/get-accounts';
import { getAccountDetails } from '@/features/accounts/utils/get-account-details';
import { formatBalance } from '@/features/accounts/utils/format-balance';
import { Account } from '@/features/accounts/models/accounts';

export const metadata: Metadata = { title: 'Account Details' };

type Props = { params: Promise<{ id: string }> };

async function AccountDetailsPage({ params }: Props) {
  const { id } = await params;

  let account: Account | null = null;

  try {
    account = await getAccount(id);
  } catch {
    return notFound();
  }

  return (
    <>
      <section>
        <PageTitle title="Account Details" />
      </section>

      <div className="mt-8 grid grid-cols-1 gap-4 lg:grid-cols-7">
        <Information account={account} />
        <AccountActions id={account.id.toString()} />
      </div>
      <ChildrenAccounts accounts={account.children} />
    </>
  );
}

function Information({ account }: { account: Account }) {
  return (
    <section className="rounded-2xl border border-gray-200 bg-white p-4 shadow lg:col-span-5">
      <h3 className="text-xl font-semibold">Account Information</h3>

      <div className="mt-4 grid grid-cols-1 gap-x-4 lg:grid-cols-2">
        {getAccountDetails(account).map((detail) => (
          <Detail key={detail.label} {...detail} />
        ))}
      </div>
      <p className="mt-6 flex flex-col">
        <span className="text-xs text-gray-600">Current Balance</span>
        <span className="text-5xl font-semibold">
          {formatBalance(account.balance)}
        </span>
      </p>
    </section>
  );
}

function ChildrenAccounts({ accounts }: { accounts: Account['children'] }) {
  const hasChildren = accounts.length > 0;

  if (!hasChildren) return null;

  return (
    <section className="mt-4 rounded-2xl border border-gray-200 bg-white p-4 shadow">
      <h3 className="text-xl font-semibold">Children Accounts</h3>
      <ul className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {accounts.map((childAccount) => (
          <AccountCard
            key={childAccount.id}
            account={childAccount}
            className="bg-background!"
          />
        ))}
      </ul>
    </section>
  );
}

export default AccountDetailsPage;
