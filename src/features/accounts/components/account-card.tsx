import Link from 'next/link';
import clsx from 'clsx';

import { formatDate } from '../../../shared/utils/format-date';
import { getAccountStateStyles } from '@/features/accounts/utils/get-account-state-styles';
import { formatBalance } from '../utils/format-balance';
import { Account } from '@/features/accounts/models/accounts';

type AccountCardProps = { account: Account; className?: string };

function AccountCard({ account, className }: AccountCardProps) {
  return (
    <li
      className={clsx(
        'rounded-2xl border border-gray-200 bg-white shadow',
        className,
      )}
    >
      <div className="space-y-4 p-4">
        <div className="flex items-center justify-between gap-4">
          <div className="max-w-1/2">
            <h3 className="truncate font-semibold">{account.userName}</h3>
            <p className="space-x-2 text-xs text-gray-600">
              <span>ID:</span>
              <span>{account.id}</span>
            </p>
          </div>
          <p
            className={clsx(
              'rounded-lg px-2 py-0.5 text-sm',
              getAccountStateStyles(account.state),
            )}
          >
            {account.state}
          </p>
        </div>

        <div className="divide-y divide-gray-200">
          <p className="flex justify-between gap-2 p-1">
            <span className="text-gray-600">Account Type</span>
            <span>{account.type}</span>
          </p>
          <p className="flex justify-between gap-2 p-1">
            <span className="text-gray-600">Date Opened</span>
            <span>{formatDate(account.createdAt)}</span>
          </p>
          <p className="flex justify-between gap-2 p-1">
            <span className="text-gray-600">Parent Account</span>
            <span>{account.parentAccountId ?? 'N/A'}</span>
          </p>

          <p className="mt-6 flex flex-col">
            <span className="text-xs leading-none font-bold tracking-tighter text-gray-600">
              BALANCE
            </span>
            <span className="truncate text-2xl font-bold">
              {formatBalance(account.balance)}
            </span>
          </p>
        </div>
      </div>
      <div className="w-full">
        <hr className="text-gray-200" />
        <div className="w-full px-4 py-2">
          <Link
            href={`/dashboard/accounts/${account.id}`}
            className="button flex items-center justify-center"
          >
            View Details
          </Link>
        </div>
      </div>
    </li>
  );
}

export default AccountCard;
