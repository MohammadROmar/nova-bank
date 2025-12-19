import { Metadata } from 'next';
import { cookies } from 'next/headers';

import { ApiClient } from '@/core/api/api-client';
import PageTitle from '@/features/dashboard/components/page-title';
import TransactionsFilters from '@/features/transactions/components/filters';
import TransactionCard from '@/features/transactions/components/transaction-card';
import Pagination from '@/features/dashboard/components/pagination';
import type { Transaction } from '@/features/transactions/models/transaction';
import type { Filters } from '@/features/transactions/models/filters';

export const metadata: Metadata = { title: 'Transactions' };

type SearchParams = { pageNum?: string; username?: string } & Filters;
type TransactionsPageProps = { searchParams: Promise<SearchParams> };
type Transactions = {
  items: Transaction[];
  totalItems: number;
  pageNumber: number;
  pageSize: number;
  totalPages: number;
};

async function getTransactions(searchParams: SearchParams) {
  const api = ApiClient.instance;
  const token = (await cookies()).get('token')?.value;

  const urlSearchParams = new URLSearchParams(searchParams);
  urlSearchParams.set('pageNum', searchParams.pageNum ?? '1');
  urlSearchParams.set('pageSize', '18');

  const transactions = await api.request<Transactions>(
    `/api/Transactions?${urlSearchParams.toString()}`,
    { headers: { Authorization: `Bearer ${token}` } },
  );
  return transactions;
}

async function TransactionsPage({ searchParams }: TransactionsPageProps) {
  const searchPars = await searchParams;
  const transactions = await getTransactions(searchPars);

  return (
    <section className="space-y-8">
      <div>
        <PageTitle title="Transactions" />
      </div>

      <TransactionsFilters />

      <ul className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {transactions.items.map((transaction) => (
          <TransactionCard key={transaction.id} transaction={transaction} />
        ))}
      </ul>

      <div className="flex items-center justify-center">
        <Pagination
          currentPage={transactions.pageNumber}
          totalPages={transactions.totalPages}
          maxButtons={5}
        />
      </div>
    </section>
  );
}

export default TransactionsPage;
