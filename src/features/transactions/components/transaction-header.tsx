'use client';

import Link from 'next/link';
import { useParams, usePathname } from 'next/navigation';
import clsx from 'clsx';

import { transactionTypes } from '../data/transaction-types';

function TransactionHeader() {
  const { id } = useParams();
  const pathname = usePathname();

  return (
    <nav className="w-full overflow-hidden">
      <ul className="flex gap-4 border-b border-gray-200 p-4 pb-0 text-sm font-medium text-gray-600 md:gap-6">
        {transactionTypes.map(({ to, icon: Icon }) => {
          const isActive = pathname.endsWith(to);

          return (
            <li key={to}>
              <Link
                href={`/dashboard/accounts/${id}/transactions/${to}`}
                className={clsx(
                  'flex items-center border-b-3 border-transparent pb-2 md:gap-2',
                  isActive && 'text-primary! border-primary!',
                )}
              >
                <span className="shrink-0">
                  <Icon className="hidden size-4.5 md:block" />
                </span>
                <span className="text-xs capitalize md:text-sm">{to}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

export default TransactionHeader;
