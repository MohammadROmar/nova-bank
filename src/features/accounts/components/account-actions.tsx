import Link from 'next/link';

import DepositIcon from '@/assets/icons/deposit';
import WithdrawIcon from '@/assets/icons/withdraw';
import TransferIcon from '@/assets/icons/transfer';
import UpdateIcon from '@/assets/icons/update';

function AccountActions({ id }: { id: string }) {
  return (
    <section className="space-y-6 rounded-2xl border border-gray-200 bg-white p-4 shadow lg:col-span-2">
      <h3 className="text-xl font-semibold">Actions</h3>
      <div className="space-y-2">
        <h4 className="mt-4 text-xs text-gray-600">ACCOUNT</h4>
        <Link
          href={`/dashboard/accounts/${id}/update`}
          className="hover:bg-primary/10 flex items-center justify-center gap-2 rounded-2xl border border-gray-200 p-2 transition-all duration-500 hover:scale-98"
        >
          <span className="shrink-0">
            <UpdateIcon className="size-4" />
          </span>
          <span>Update Account</span>
        </Link>
      </div>

      <div className="space-y-2">
        <h4 className="mt-4 text-xs text-gray-600">TRANSACTIONS</h4>
        <div className="flex flex-wrap gap-2">
          <Link
            href={`/dashboard/accounts/${id}/transactions/deposit`}
            className="hover:bg-primary/10 flex flex-1 flex-col items-center justify-center gap-2 rounded-2xl border border-gray-200 p-2 transition-all duration-500 hover:scale-98"
          >
            <span className="shrink-0">
              <DepositIcon className="size-4" />
            </span>
            <span>Deposit</span>
          </Link>
          <Link
            href={`/dashboard/accounts/${id}/transactions/withdraw`}
            className="hover:bg-primary/10 flex flex-1 flex-col items-center justify-center gap-2 rounded-2xl border border-gray-200 p-2 transition-all duration-500 hover:scale-98"
          >
            <span className="shrink-0">
              <WithdrawIcon className="size-4" />
            </span>
            <span>Withdraw</span>
          </Link>
        </div>
        <Link
          href={`/dashboard/accounts/${id}/transactions/transfer`}
          className="hover:bg-primary/10 flex flex-wrap items-center justify-center gap-2 rounded-2xl border border-gray-200 p-2 transition-all duration-500 hover:scale-98"
        >
          <span className="shrink-0">
            <TransferIcon className="size-4" />
          </span>
          <span>Transfer</span>
        </Link>
      </div>
    </section>
  );
}

export default AccountActions;
