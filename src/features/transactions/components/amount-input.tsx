import { useState, ChangeEvent } from 'react';

import Input from '@/shared/components/input';
import { formatBalance } from '@/features/accounts/utils/format-balance';
import FormActions from '@/features/dashboard/components/form-actions';

type AmountInputProps = {
  operation: '+' | '-';
  balance: number;
  pending: boolean;
};
type CalculateBalanceProps = AmountInputProps & { amount: string };

function AmountInput({ operation, balance, pending }: AmountInputProps) {
  const [amount, setAmount] = useState('');

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const onlyNumbers = e.currentTarget.value.replace(/\D/g, '');
    setAmount(onlyNumbers);
  }

  return (
    <>
      <Input
        id="amount"
        label="Amount"
        type="text"
        inputMode="numeric"
        pattern="[0-9]*"
        disabled={pending}
        value={amount}
        onChange={handleChange}
        placeholder="Enter numbers only"
      />
      <CalculateBalance
        amount={amount}
        operation={operation}
        balance={balance}
        pending={pending}
      />
    </>
  );
}

function CalculateBalance({
  amount,
  operation,
  balance,
  pending,
}: CalculateBalanceProps) {
  let amountAsNumber = +amount;
  if (isNaN(amountAsNumber)) amountAsNumber = 0;

  const currentAmount = amount.length === 0 ? 0 : amountAsNumber;
  const projectedBalance =
    balance + (operation === '+' ? amountAsNumber : -amountAsNumber);

  const isValidTransaction =
    operation === '+'
      ? amountAsNumber > 0
      : projectedBalance >= 0 && amountAsNumber > 0;

  return (
    <>
      <div className="space-y-2 rounded-2xl border border-gray-200 bg-blue-50/50 p-4 text-gray-600">
        <p className="flex flex-wrap items-center justify-between gap-x-4 text-sm">
          <span>{operation === '+' ? 'Deposit' : 'Withdraw'} Amount</span>
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
        label={operation === '+' ? 'Deposit' : 'Withdraw'}
        pending={pending}
        disabled={!isValidTransaction}
      />
    </>
  );
}

export default AmountInput;
