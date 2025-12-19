'use client';

import { useActionState } from 'react';

import { useUserRoleContext } from '@/shared/store/role';
import { useSuccessToast } from '@/features/dashboard/hooks/use-success-toast';
import Button from '@/shared/components/button';
import { TransactionStatusSelector } from './selectors';
import { splitOnUppercase } from '../utils/split-on-uppercase';
import { changeTransactionStatus } from '../api/change-status';
import { Transaction } from '../models/transaction';
import ErrorMessage from '@/shared/components/error-message';

type Props = { id: number; defaultStatus: Transaction['status'] };

function ChangeTransactionStatus({ id, defaultStatus }: Props) {
  const action = changeTransactionStatus.bind(null, id);
  const [state, formAction, pending] = useActionState(action, {});
  console.log(state);

  const { role } = useUserRoleContext();
  useSuccessToast('Status Changed Successfuly', state.success, [
    state.id,
    state.success,
  ]);

  const notAllowedToChange =
    role === 'Manager' && defaultStatus === 'PendingAdmin';
  const isDisabled =
    pending ||
    defaultStatus === 'Approved' ||
    defaultStatus === 'Rejected' ||
    notAllowedToChange;

  return (
    <section className="mt-8 rounded-2xl border border-gray-200 bg-white p-4 shadow">
      <form action={formAction} className="space-y-6">
        <h3 className="text-lg font-semibold">Change Transaction Status</h3>
        <TransactionStatusSelector
          disabled={isDisabled}
          isClearable={false}
          defaultValue={{
            label: splitOnUppercase(defaultStatus),
            value: defaultStatus,
          }}
        />

        <p className="text-sm">
          <span className="font-bold text-yellow-400">Note: </span>
          <span>
            Once the status is changed to
            <span className="font-bold text-green-400"> Approved</span> or{' '}
            <span className="font-bold text-red-400">Rejected</span>, it cannont
            be modified thereafter.
          </span>
        </p>

        <div className="flex justify-end">
          <Button pending={pending} disabled={isDisabled} className="lg:w-fit">
            Change
          </Button>
        </div>

        <ErrorMessage state={state} />
      </form>
    </section>
  );
}

export default ChangeTransactionStatus;
