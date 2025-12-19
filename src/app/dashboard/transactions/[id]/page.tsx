import Link from 'next/link';
import { cookies } from 'next/headers';
import clsx from 'clsx';

import PageTitle from '@/features/dashboard/components/page-title';
import CalenderIcon from '@/assets/icons/calender';
import { ApiClient } from '@/core/api/api-client';
import { formatBalance } from '@/features/accounts/utils/format-balance';
import { formatDate, formateDateTime } from '@/shared/utils/format-date';
import { splitOnUppercase } from '@/features/transactions/utils/split-on-uppercase';
import {
  transactionStatusStyles,
  transactionTypeStyles,
} from '@/features/transactions/utils/transaction-styles';
import { Transaction } from '@/features/transactions/models/transaction';
import ChangeTransactionStatus from '@/features/transactions/components/change-status';

type Props = { params: Promise<{ id: string }> };

async function getTransaction(id: string) {
  const api = ApiClient.instance;
  const token = (await cookies()).get('token')?.value;

  const transactions = await api.request<Transaction>(
    `/api/Transactions/${id}`,
    { headers: { Authorization: `Bearer ${token}` } },
  );
  return transactions;
}

async function TransactionsDetailsPage({ params }: Props) {
  const { id } = await params;
  const transaction = await getTransaction(id);

  return (
    <>
      <section>
        <PageTitle title="Transaction Details" />
      </section>
      <TransactionInfo transaction={transaction} />
      <ChangeTransactionStatus
        id={transaction.id}
        defaultStatus={transaction.status}
      />
    </>
  );
}

function TransactionInfo({ transaction }: { transaction: Transaction }) {
  const typeStyles = transactionTypeStyles[transaction.transactionType];
  const statusStyles = transactionStatusStyles[transaction.status];

  return (
    <section className="mt-8 space-y-4 rounded-2xl border border-gray-200 bg-white shadow">
      <h3 className="pt-4 pl-4 text-lg font-semibold">
        Transaction Information
      </h3>
      <div className="grid grid-cols-1 divide-x divide-gray-200 border-y border-gray-200 max-lg:divide-y md:grid-cols-2 lg:grid-cols-3">
        <div className="space-y-1 p-4">
          <p className="text-xs text-gray-600">Total Amount</p>
          <p className="text-xl font-semibold">
            {formatBalance(transaction.amount)}
          </p>
        </div>
        <div className="space-y-1 p-4">
          <p className="text-xs text-gray-600">Type</p>
          <div className="flex items-center gap-2">
            <div
              className={clsx(
                'flex items-center justify-center rounded-lg p-1.5',
                typeStyles.className,
              )}
            >
              <typeStyles.icon className="size-5" />
            </div>
            <p className="text-xl font-semibold">
              {transaction.transactionType}
            </p>
          </div>
        </div>
        <div className="space-y-1 p-4">
          <p className="text-xs text-gray-600">Appove Date</p>
          {transaction.approvedAt ? (
            <div className="flex items-center gap-1">
              <CalenderIcon className="size-6 text-gray-600" />
              <p className="text-xl font-semibold">
                {formatDate(transaction.approvedAt)} at{' '}
                {formateDateTime(transaction.approvedAt)}
              </p>
            </div>
          ) : (
            <p className="text-xl font-semibold">-</p>
          )}
        </div>
      </div>

      <div className="space-y-4 p-4 pt-0">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="space-y-1">
            <p className="text-xs text-gray-600">Status</p>
            <p
              className={clsx(
                'w-fit rounded-full border px-2 py-1 text-sm leading-none font-semibold uppercase',
                statusStyles,
              )}
            >
              {splitOnUppercase(transaction.status)}
            </p>
          </div>
          <div className="space-y-1">
            <p className="text-xs text-gray-600">Approved By</p>
            <p className="">
              {transaction.approvedByUserName ??
                transaction.approvedByUserId ??
                '-'}
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-600">From Account</p>
            {transaction.fromAccountId ? (
              <div className="flex items-center gap-1">
                <p>{transaction.fromAccountId}</p>
                <Link
                  href={`/dashboard/accounts/${transaction.fromAccountId}`}
                  className="text-xs text-gray-600 underline hover:cursor-pointer"
                >
                  View Account
                </Link>
              </div>
            ) : (
              <p>-</p>
            )}
          </div>
          <div>
            <p className="text-xs text-gray-600">To Account</p>
            <div className="flex items-center gap-1">
              <p>{transaction.toAccountId}</p>
              <Link
                href={`/dashboard/accounts/${transaction.toAccountId}`}
                className="text-xs text-gray-600 underline hover:cursor-pointer"
              >
                View Account
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default TransactionsDetailsPage;
