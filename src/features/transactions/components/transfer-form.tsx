'use client';

import dynamic from 'next/dynamic';
import { useActionState } from 'react';

import { useUserRoleContext } from '@/shared/store/role';
import { useTransactionToast } from '../hooks/use-transaction-toast';
import TransactionAccount from './account';
import AmountInput from './amount-input';
import ErrorMessage from '@/shared/components/error-message';
import SelectorSkeleton from '@/features/accounts/components/selector-skeleton';
import { transferAction } from '../api/transfer';
import { Account } from '@/features/accounts/models/accounts';

const AccountSelector = dynamic(() => import('./account-selector'), {
  ssr: false,
  loading: () => <SelectorSkeleton />,
});

type TransferFormProps = { account: Account };

function TransferForm({ account }: TransferFormProps) {
  const action = transferAction.bind(null, account.id);
  const [state, formAction, pending] = useActionState(action, {});

  const { role } = useUserRoleContext();
  useTransactionToast({ role, transactionType: 'Transfer', state });

  return (
    <>
      <TransactionAccount account={account} />

      <form action={formAction} className="mt-6 space-y-6">
        <AmountInput
          transactionType="Transfer"
          balance={account.balance}
          pending={pending}
        >
          <AccountSelector required disabled={pending} />
        </AmountInput>
        <ErrorMessage state={state} />
      </form>
    </>
  );
}

export default TransferForm;
