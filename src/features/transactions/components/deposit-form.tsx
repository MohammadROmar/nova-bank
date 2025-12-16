'use client';

import { useActionState } from 'react';

import { useSuccessToast } from '@/features/dashboard/hooks/use-success-toast';
import TransactionAccount from './account';
import ErrorMessage from '@/shared/components/error-message';
import AmountInput from './amount-input';
import { depositAction } from '../api/desposit';
import { Account } from '@/features/accounts/models/accounts';

type DepositFormProps = { account: Account };

function DepositForm({ account }: DepositFormProps) {
  const action = depositAction.bind(null, account.id);
  const [state, formAction, pending] = useActionState(action, {});
  useSuccessToast('transaction Successful', state.success, [
    state.id,
    state.success,
  ]);

  return (
    <>
      <TransactionAccount account={account} />

      <form action={formAction} className="mt-6 space-y-6">
        <AmountInput
          operation="+"
          balance={account.balance}
          pending={pending}
        />
        <ErrorMessage state={state} />
      </form>
    </>
  );
}

export default DepositForm;
