import FormActions from '@/features/dashboard/components/form-actions';
import { formatBalance } from '@/features/accounts/utils/format-balance';
import type { AmountInputProps } from './amount-input';

type CalculateBalanceProps = AmountInputProps & { amount: string };

function CalculateBalance({
  amount,
  transactionType,
  balance,
  pending,
}: CalculateBalanceProps) {
  let amountAsNumber = +amount;
  if (isNaN(amountAsNumber)) amountAsNumber = 0;

  const currentAmount = amount.length === 0 ? 0 : amountAsNumber;
  const projectedBalance =
    balance +
    (transactionType === 'Deposit' ? amountAsNumber : -amountAsNumber);

  const isValidTransaction =
    transactionType === 'Deposit'
      ? amountAsNumber > 0
      : projectedBalance >= 0 && amountAsNumber > 0;

  return (
    <>
      <div className="space-y-2 rounded-2xl border border-gray-200 bg-blue-50/50 p-4 text-gray-600">
        <p className="flex flex-wrap items-center justify-between gap-x-4 text-sm">
          <span>{transactionType} Amount</span>
          <span className="text-black">{formatBalance(currentAmount)}</span>
        </p>
        <p className="flex flex-wrap items-center justify-between gap-x-4 text-sm">
          <span>Current Balance</span>
          <span className="text-black">{formatBalance(balance)}</span>
        </p>
        <hr className="text-gray-200" />
        {isValidTransaction ? (
          <p className="flex flex-wrap items-center justify-between gap-x-4 font-bold text-black">
            <span>Projected Balance</span>
            <span>{formatBalance(projectedBalance)}</span>
          </p>
        ) : (
          <p className="text-red-600">
            Invalid Transaction. Please enter a valid amount.
          </p>
        )}
      </div>
      <FormActions
        label={transactionType}
        pending={pending}
        disabled={!isValidTransaction}
      />
    </>
  );
}

export default CalculateBalance;
