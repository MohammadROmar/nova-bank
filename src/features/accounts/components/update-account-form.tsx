'use client';

import dynamic from 'next/dynamic';
import { useActionState } from 'react';

import { useSuccessToast } from '@/features/dashboard/hooks/use-success-toast';
import AccountTypeSelector from './account-type-selector';
import SelectorSkeleton from './selector-skeleton';
import FormActions from '@/features/dashboard/components/form-actions';
import ErrorMessage from '@/shared/components/error-message';
import { updateAccountAction } from '../api/update-account';
import { Account } from '../models/accounts';

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

  useSuccessToast('Account Updated Successfully', state.success, [
    state.id,
    state.success,
  ]);

  const isClosed = account.state == 'Closed';

  return (
    <form
      action={formAction}
      className="mt-8 space-y-6 rounded-2xl border border-gray-200 bg-white p-4 shadow"
    >
      <div className="space-y-1">
        <h3 className="text-lg font-medium">Account Information</h3>
        <p className="text-sm font-medium">
          <span className="text-yellow-500">Note: </span>Leave field as is to
          keep its value.
        </p>
      </div>
      <ParentAccountSelector
        disabled={pending || isClosed}
        accountId={account.id}
        parentAccount={parentAccount ?? undefined}
        username={account.userName}
      />
      <AccountTypeSelector
        defaultType={account.type}
        disabled={pending || isClosed}
      />
      <FormActions label="Update" pending={pending} disabled={isClosed} />
      <ErrorMessage state={state} />
    </form>
  );
}

export default UpdateAccountForm;
