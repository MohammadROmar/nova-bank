'use client';

import { useActionState, useEffect } from 'react';
import { toast } from 'sonner';

import Input from '@/shared/components/input';
import PasswordInput from '@/shared/components/password-input';
import { registerManagerAction } from '../api/register-manager';
import FormActions from '@/features/dashboard/components/form-actions';

export default function RegisterManagerForm() {
  const [state, formAction, pending] = useActionState(
    registerManagerAction,
    {},
  );

  useEffect(() => {
    if (state.success) {
      toast.success('Manager Registered Successfully', {
        classNames: {
          toast: 'bg-white! rounded-2xl! border-gray-200!',
          icon: 'text-green-500!',
        },
      });
    }
  }, [state.id, state.success]);

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
