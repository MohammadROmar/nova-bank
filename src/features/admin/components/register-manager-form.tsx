'use client';

import { useActionState } from 'react';

import { useSuccessToast } from '@/features/dashboard/hooks/use-success-toast';
import Input from '@/shared/components/input';
import PasswordInput from '@/shared/components/password-input';
import FormActions from '@/features/dashboard/components/form-actions';
import { registerManagerAction } from '../api/register-manager';

export default function RegisterManagerForm() {
  const [state, formAction, pending] = useActionState(
    registerManagerAction,
    {},
  );

  useSuccessToast('Manager Registered Successfully', state.success, [
    state.id,
    state.success,
  ]);

  return (
    <form
      action={formAction}
      className="border-gray-w00 mt-8 space-y-6 max-lg:flex max-lg:flex-col max-lg:justify-between lg:h-fit lg:rounded-2xl lg:border lg:bg-white lg:p-4"
    >
      <div className="space-y-6">
        <div className="flex w-full flex-col gap-6 lg:flex-row">
          <Input
            id="username"
            label="Username"
            autoComplete="username"
            placeholder="Enter a unique username"
            defaultValue={state.values?.userName}
            className="lg:bg-background!"
          />
          <Input
            id="phoneNumber"
            label="Phone Number"
            autoComplete="tel"
            placeholder="Enter phone number"
            defaultValue={state.values?.phoneNumber}
            className="lg:bg-background!"
          />
        </div>
        <Input
          id="email"
          label="Email Address"
          autoComplete="email"
          type="email"
          placeholder="Enter a unique email"
          defaultValue={state.values?.email}
          className="lg:bg-background!"
        />
        <PasswordInput
          actionResultId={state.id}
          success={state.success}
          label="Password"
          placeholder="Enter a secure password"
          defaultValue={state.values?.password}
          className="lg:bg-background!"
        />
      </div>

      <FormActions label="Register" disabled={pending} />

      {state.success === false && (
        <p className="text-sm text-red-500">{state.error}</p>
      )}
    </form>
  );
}
