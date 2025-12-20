'use client';

import { useActionState } from 'react';

import { useSuccessToast } from '@/features/dashboard/hooks/use-success-toast';
import Input from '@/shared/components/input';
import PasswordInput from '@/shared/components/password-input';
import FormActions from '@/features/dashboard/components/form-actions';
import ErrorMessage from '@/shared/components/error-message';
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
      className="mt-8 space-y-6 rounded-2xl border border-gray-200 bg-white p-4"
    >
      <div className="space-y-6">
        <div className="flex w-full flex-col gap-6 lg:flex-row">
          <Input
            id="username"
            label="Username"
            autoComplete="username"
            disabled={pending}
            placeholder="Enter a unique username"
            defaultValue={state.values?.userName}
            className="bg-background!"
          />
          <Input
            id="phoneNumber"
            label="Phone Number"
            autoComplete="tel"
            disabled={pending}
            placeholder="Enter phone number"
            defaultValue={state.values?.phoneNumber}
            className="bg-background!"
          />
        </div>
        <Input
          id="email"
          label="Email Address"
          autoComplete="email"
          disabled={pending}
          type="email"
          placeholder="Enter a unique email"
          defaultValue={state.values?.email}
          className="bg-background!"
        />
        <PasswordInput
          key={state.success ? `success-${state.id}` : 'password-input'}
          disabled={pending}
          label="Password"
          placeholder="Enter a secure password"
          defaultValue={state.values?.password}
          className="bg-background!"
        />
      </div>

      <FormActions label="Register" pending={pending} />
      <ErrorMessage state={state} />
    </form>
  );
}
