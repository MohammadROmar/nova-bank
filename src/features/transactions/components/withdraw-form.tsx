'use client';

import { useActionState } from 'react';

import { useUserRoleContext } from '@/shared/store/role';
import { useTransactionToast } from '../hooks/use-transaction-toast';
import TransactionAccount from './account';
import ErrorMessage from '@/shared/components/error-message';
import AmountInput from './amount-input';
import { withdrawAction } from '../api/withdraw';
import { Account } from '@/features/accounts/models/accounts';

type WithdrawFormProps = { account: Account };

function WithdrawForm({ account }: WithdrawFormProps) {
  const action = withdrawAction.bind(null, account.id);
  const [state, formAction, pending] = useActionState(action, {});

  const { role } = useUserRoleContext();
  useTransactionToast({ role, transactionType: 'Withdraw', state });

  return (
    <>
      <TransactionAccount account={account} />

      <form action={formAction} className="mt-6 space-y-6">
        <AmountInput
          transactionType="Withdraw"
          balance={account.balance}
          pending={pending}
        />
        <ErrorMessage state={state} />
      </form>
    </>
  );
}

export default WithdrawForm;
