import { Metadata } from 'next';
import { cookies } from 'next/headers';

import PageTitle from '@/features/dashboard/components/page-title';
import UserSearchInput from '@/features/accounts/components/user-search';
import AccountCard from '@/features/accounts/components/account-card';
import Pagination from '@/features/dashboard/components/pagination';
import { ApiClient } from '@/core/api/api-client';
import { Account } from '@/features/accounts/models/accounts';

export const metadata: Metadata = { title: 'All Accounts' };

type AccountsPageProps = {
  searchParams: Promise<{ pageNum?: string; username?: string }>;
};
type Accounts = {
  items: Account[];
  totalItems: number;
  pageNumber: number;
  pageSize: number;
  totalPages: number;
};

async function getAccounts(pageNum?: string, username?: string) {
  const api = ApiClient.instance;
  const token = (await cookies()).get('token')?.value;

  const accounts = await api.request<Accounts>(
    `/api/Accounts?pageNum=${pageNum ?? 1}&pageSize=6${username ? `&username=${username}` : ''}`,
    { headers: { Authorization: `Bearer ${token}` } },
  );
  return accounts;
}

async function AccountsPage({ searchParams }: AccountsPageProps) {
  const { pageNum, username } = await searchParams;

  const accounts = await getAccounts(pageNum, username);

  return (
    <section className="space-y-8">
      <div>
        <PageTitle title="Accounts" />
      </div>

      <div className="space-y-4">
        <UserSearchInput />

        <ul className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {accounts.items.map((account) => (
            <AccountCard key={account.id} account={account} />
          ))}
        </ul>

        <div className="flex items-center justify-center">
          <Pagination
            currentPage={accounts.pageNumber}
            totalPages={accounts.totalPages}
            maxButtons={5}
          />
        </div>
      </div>
    </section>
  );
}

export default AccountsPage;
