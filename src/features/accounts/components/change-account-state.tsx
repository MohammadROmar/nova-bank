'use client';

import { useActionState } from 'react';

import { useSuccessToast } from '@/features/dashboard/hooks/use-success-toast';
import FormActions from '@/features/dashboard/components/form-actions';
import { changeAccountState } from '../api/change-account-state';
import { accountStates } from '../data/account-states';
import { Account } from '../models/accounts';

type Props = { id: number; defaultState: Account['state'] };

function ChangeAccountState({ id, defaultState }: Props) {
  const action = changeAccountState.bind(null, id);
  const [state, formAction, pending] = useActionState(action, {});

  useSuccessToast('Account Created Successfully', state.success, [
    state.id,
    state.success,
  ]);

  const selectedState =
    accountStates.find((account) => account.name === defaultState)?.id ?? 0;

  return (
    <form
      action={formAction}
      className="mt-8 space-y-6 rounded-2xl border border-gray-200 bg-white p-4 shadow"
    >
      <h3 className="text-lg font-medium">Account State</h3>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {accountStates.map(({ id, name, description, icon: Icon }, i) => (
          <label key={id} className="size-full">
            <input
              type="radio"
              name="accountState"
              defaultChecked={selectedState === id}
              value={id}
              className="peer sr-only"
            />
            <div className="bg-background peer-checked:border-primary peer-checked:bg-primary/10 peer-checked:text-primary flex w-full cursor-pointer justify-between rounded-2xl border-2 border-transparent px-4 py-3 shadow transition-colors duration-300 peer-disabled:cursor-not-allowed peer-disabled:opacity-60">
              <div className="flex flex-col">
                <span className="font-semibold">{name}</span>
                <span className="text-xs text-gray-600">{description}</span>
              </div>
              <Icon className="size-5" />
            </div>
          </label>
        ))}
      </div>

      <FormActions label="Change" disabled={pending} />
    </form>
  );
}

export default ChangeAccountState;
