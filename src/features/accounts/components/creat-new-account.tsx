'use client';

import dynamic from 'next/dynamic';
import { useActionState, useEffect, useState } from 'react';
import { toast } from 'sonner';

import SelectorSkeleton from './selector-skeleton';
import AccountTypeSelector from './account-type-selector';
import FormActions from '@/features/dashboard/components/form-actions';
import { createAccountAction } from '../api/create-account';

const UserSelector = dynamic(() => import('./user-selector'), {
  ssr: false,
  loading: () => <SelectorSkeleton />,
});
const ParentAccountSelector = dynamic(
  () => import('./parent-account-selector'),
  {
    ssr: false,
    loading: () => <SelectorSkeleton />,
  },
);

export default function CreateNewAccount() {
  const [state, formAction, pending] = useActionState(createAccountAction, {});
  const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {
    if (state.success) {
      toast.success('Account Created Successfully', {
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
      className="space-y-6 rounded-2xl border border-gray-200 bg-white p-4 shadow"
    >
      <UserSelector disabled={pending} changeUsername={setUsername} />
      <ParentAccountSelector
        id={state.id}
        username={username}
        disabled={pending}
      />
      <AccountTypeSelector disabled={pending} />
      <Actions pending={pending} />

      {state.success === false && (
        <p className="text-sm text-red-500">{state.error}</p>
      )}
    </form>
  );
}

function Actions({ pending }: { pending: boolean }) {
  return (
    <>
      <p className="text-sm font-medium">
        <span className="text-yellow-500">Note: </span>Fields marked{' '}
        <span className="text-red-500">*</span> are required.
      </p>
      <FormActions label="Create" disabled={pending} />
    </>
  );
}
