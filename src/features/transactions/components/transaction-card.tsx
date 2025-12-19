import Link from 'next/link';
import clsx from 'clsx';

import {
  transactionStatusStyles,
  transactionTypeStyles,
} from '../utils/transaction-styles';
import { formatBalance } from '@/features/accounts/utils/format-balance';
import { transactionCardDetails } from '../data/transaction-card-details';
import type { Transaction } from '../models/transaction';

type Props = { transaction: Transaction };

function splitOnUppercase(str: string) {
  return str.replace(/([a-z])([A-Z])/g, '$1 $2');
}

function TransactionCard({ transaction }: Props) {
  const typeStyles = transactionTypeStyles[transaction.transactionType];
  const statusStyles = transactionStatusStyles[transaction.status];

  return (
    <li aria-label={`transaction #${transaction.id}`} className="size-full">
      <Link
        href={`/dashboard/transactions/${transaction.id}`}
        className="flex size-full flex-col space-y-4 rounded-2xl border border-gray-200 bg-white p-4 shadow"
      >
        <div className="flex flex-wrap items-start justify-between gap-2">
          <div className="flex flex-wrap items-center gap-2">
            <div
              className={clsx(
                'flex items-center justify-center rounded-lg p-1.5',
                typeStyles.className,
              )}
            >
              <typeStyles.icon className="size-5" />
            </div>

            <div>
              <h3 className="font-semibold tracking-tight">
                {transaction.transactionType}
              </h3>
              <p className="text-xs text-gray-600">#{transaction.id}</p>
            </div>
          </div>

          <p
            className={clsx(
              'rounded-full border px-2 py-1 text-xs leading-none font-semibold uppercase',
              statusStyles,
            )}
          >
            {splitOnUppercase(transaction.status)}
          </p>
        </div>

        <div className="font-bold">
          <p className="text-xs text-gray-600">AMOUNT</p>
          <p className="truncate text-2xl">
            {formatBalance(transaction.amount)}
          </p>
        </div>

        <div className="flex flex-1 flex-col justify-end gap-6">
          <hr className="text-gray-200" />

          <div className="grid grid-cols-2 gap-2">
            {transactionCardDetails(transaction).map(({ title, value }) => (
              <div key={title}>
                <p className="text-xs font-medium text-gray-600">{title}</p>
                <p className="text-sm">{value}</p>
              </div>
            ))}
          </div>
        </div>
      </Link>
    </li>
  );
}

export default TransactionCard;
