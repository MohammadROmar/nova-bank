import { useState, ChangeEvent, PropsWithChildren } from 'react';

import Input from '@/shared/components/input';
import CalculateBalance from './calculate-balance';

export type AmountInputProps = {
  transactionType: 'Deposit' | 'Withdraw' | 'Transfer';
  balance: number;
  pending: boolean;
};

function AmountInput({
  transactionType,
  balance,
  pending,
  children,
}: AmountInputProps & PropsWithChildren) {
  const [amount, setAmount] = useState('');

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const onlyNumbers = e.currentTarget.value.replace(/\D/g, '');
    setAmount(onlyNumbers);
  }

  return (
    <>
      <div
        className={
          children ? 'grid grid-cols-1 gap-4 lg:grid-cols-2' : undefined
        }
      >
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
          className="bg-background!"
        />
        {children}
      </div>
      <CalculateBalance
        amount={amount}
        transactionType={transactionType}
        balance={balance}
        pending={pending}
      />
    </>
  );
}

export default AmountInput;
