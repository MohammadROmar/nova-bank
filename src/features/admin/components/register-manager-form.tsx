'use client';

import { useActionState, useEffect } from 'react';
import { toast } from 'sonner';

import Input from '@/shared/components/input';
import PasswordInput from '@/shared/components/password-input';
import Button from '@/shared/components/button';
import { registerManagerAction } from '../api/register-manager';

export default function RegisterManagerForm() {
  const [state, formAction, pending] = useActionState(
    registerManagerAction,
    {},
  );

  useEffect(() => {
    if (state.success) {
      toast.success('Manager Registered Successfully', {
        classNames: {
          title: 'text-heading!',
          toast: 'bg-white! rounded-2xl! border-gray-300!',
          icon: 'text-green-500!',
        },
      });
    }
  }, [state.id, state.success]);

  return (
    <form
      action={formAction}
      className="mt-8 space-y-6 border-gray-300 max-lg:flex max-lg:flex-col max-lg:justify-between lg:h-fit lg:rounded-2xl lg:border lg:bg-white lg:p-4"
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
            Register
          </Button>
        </div>
      </div>
      {state.success === false && (
        <p className="text-sm text-red-500">{state.error}</p>
      )}
    </form>
  );
}
