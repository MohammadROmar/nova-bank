'use client';

import { useActionState } from 'react';

import { useUserRoleContext } from '@/shared/store/role';
import { useTransactioToast } from '../hooks/use-transaction-toast';
import TransactionAccount from './account';
import ErrorMessage from '@/shared/components/error-message';
import AmountInput from './amount-input';
import { depositAction } from '../api/desposit';
import { Account } from '@/features/accounts/models/accounts';

type DepositFormProps = { account: Account };

function DepositForm({ account }: DepositFormProps) {
  const action = depositAction.bind(null, account.id);
  const [state, formAction, pending] = useActionState(action, {});

  const { role } = useUserRoleContext();
  useTransactioToast({
    accountId: account.id,
    role,
    transactionType: 'Deposit',
    state,
  });

  return (
    <>
      <TransactionAccount account={account} />

      <form action={formAction} className="mt-6 space-y-6">
        <AmountInput
          transactionType="Deposit"
          balance={account.balance}
          pending={pending}
        />
        <ErrorMessage state={state} />
      </form>
    </>
  );
}

export default DepositForm;
