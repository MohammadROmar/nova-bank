'use client';

import { useActionState } from 'react';

import TransactionAccount from './account';
import ErrorMessage from '@/shared/components/error-message';
import AmountInput from './amount-input';
import FormActions from '@/features/dashboard/components/form-actions';
import { withdrawAction } from '../api/withdraw';
import { Account } from '@/features/accounts/models/accounts';

type WithdrawFormProps = { account: Account };

function WithdrawForm({ account }: WithdrawFormProps) {
  const action = withdrawAction.bind(null, account.id);
  const [state, formAction, pending] = useActionState(action, {});

  return (
    <>
      <TransactionAccount account={account} />

      <form action={formAction} className="mt-6 space-y-6">
        <AmountInput
          operation="-"
          balance={account.balance}
          pending={pending}
        />
        <ErrorMessage state={state} />
      </form>
    </>
  );
}

export default WithdrawForm;
