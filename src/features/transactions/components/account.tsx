import WalletIcon from '@/assets/icons/wallet';
import { Account } from '@/features/accounts/models/accounts';
import { formatBalance } from '@/features/accounts/utils/format-balance';

type Props = { account: Account };

function TransactionAccount({ account }: Props) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-gray-200 bg-blue-50/50 p-4 text-gray-600">
      <div className="flex items-center gap-4">
        <div className="flex items-center justify-center rounded-full bg-blue-100 p-2">
          <WalletIcon className="size-8" />
        </div>

        <div className="flex flex-col justify-between gap-1">
          <h4 className="text-xs font-bold">FROM ACCOUNT</h4>
          <p className="font-medium text-black">
            {account.userName} (ID: {account.id})
          </p>
        </div>
      </div>

      <div className="flex flex-col justify-between gap-1 md:items-end">
        <h4 className="text-xs font-medium">Available Balance</h4>
        <p className="text-xl font-bold text-black">
          {formatBalance(account.balance)}
        </p>
      </div>
    </div>
  );
}

export default TransactionAccount;
