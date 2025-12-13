'use client';

import dynamic from 'next/dynamic';
import { useActionState, useEffect } from 'react';
import { toast } from 'sonner';

import AccountTypeSelector from './account-type-selector';
import SelectorSkeleton from './selector-skeleton';
import FormActions from '@/features/dashboard/components/form-actions';
import { Account } from '../models/accounts';
import { updateAccountAction } from '../api/update-account';

const ParentAccountSelector = dynamic(
  () => import('./parent-account-selector'),
  {
    ssr: false,
    loading: () => <SelectorSkeleton />,
  },
);

type Props = { account: Account; parentAccount: Account | null };

function UpdateAccountForm({ account, parentAccount }: Props) {
  const action = updateAccountAction.bind(null, account.id.toString());
  const [state, formAction, pending] = useActionState(action, {});

  useEffect(() => {
    if (state.success) {
      toast.success('Account Updated Successfully', {
        classNames: {
          toast: 'bg-white! rounded-2xl! border-gray-200!',
          icon: 'text-green-500',
        },
      });
    }
  }, [state.id, state.success]);

  return (
    <form
      action={formAction}
      className="mt-8 space-y-6 rounded-2xl border border-gray-200 bg-white p-4 shadow"
    >
      <div className="space-y-1">
        <h3 className="text-lg font-medium">Account Information</h3>
        <p className="text-sm font-medium">
          <span className="text-yellow-500">Note: </span>Leave fields as is to
          keep its value.
        </p>
      </div>
      <ParentAccountSelector
        disabled={pending}
        accountId={account.id}
        parentAccount={parentAccount ?? undefined}
        username={account.userName}
      />
      <AccountTypeSelector defaultType={account.type} disabled={pending} />
      <FormActions label="Update" disabled={pending} />
      {state.success === false && (
        <p className="text-sm text-red-500">{state.error}</p>
      )}
    </form>
  );
}

export default UpdateAccountForm;
