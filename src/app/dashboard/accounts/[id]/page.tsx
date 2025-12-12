import { cookies } from 'next/headers';

import PageTitle from '@/features/dashboard/components/page-title';
import Detail from '@/features/accounts/components/detail';
import AccountCard from '@/features/accounts/components/account-card';
import { ApiClient } from '@/core/api/api-client';
import { Account } from '@/features/accounts/models/accounts';
import { getAccountDetails } from '@/features/accounts/utils/get-account-details';

type Props = { params: Promise<{ id: string }> };

async function getAccount(id: string) {
  const api = ApiClient.instance;
  const token = (await cookies()).get('token')?.value;

  const account = await api.request<Account>(`/api/Accounts/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return account;
}

async function AccountDetailsPage({ params }: Props) {
  const { id } = await params;

  const account = await getAccount(id);

  return (
    <>
      <section>
        <PageTitle title="Account Details" />
      </section>

      <div className="mt-8 grid grid-cols-1 gap-4 lg:grid-cols-7">
        <Information account={account} />
        <Actions id={account.id.toString()} />
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
        <span className="text-5xl font-semibold">{account.balance}S.P</span>
      </p>
    </section>
  );
}

function Actions({ id }: { id: string }) {
  return (
    <section className="rounded-2xl border border-gray-200 bg-white p-4 shadow lg:col-span-2">
      <h3 className="text-xl font-semibold">Actions</h3>
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
