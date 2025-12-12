'use client';

import dynamic from 'next/dynamic';
import { useActionState, useEffect } from 'react';
import { toast } from 'sonner';

import Button from '@/shared/components/button';
import SelectorSkeleton from './selector-skeleton';
import { createAccountAction } from '../api/create-account';
import AccountTypeSelector from './account-type-selector';

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

  useEffect(() => {
    if (state.success) {
      toast.success('Account Created Successfully', {
        classNames: {
          title: 'text-heading!',
          toast: 'bg-white! rounded-2xl! border-gray-300!',
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
      <UserSelector disabled={pending} />
      <ParentAccountSelector id={state.id} disabled={pending} />
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
      <div className="flex justify-end">
        <div className="flex items-center gap-2 max-lg:w-full max-lg:flex-col-reverse">
          <button
            disabled={pending}
            type="reset"
            className="button bg-transparent! font-normal text-current! max-lg:w-full"
          >
            Reset
          </button>
          <Button
            pending={pending}
            className="flex items-center justify-center max-lg:w-full"
          >
            Create
          </Button>
        </div>
      </div>
    </>
  );
}
