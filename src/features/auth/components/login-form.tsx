'use client';

import { useActionState } from 'react';

import Input from '@/shared/components/input';
import Button from '@/shared/components/button';
import { loginAction } from '../api/login';

export default function LoginForm() {
  const [state, formAction, pending] = useActionState(loginAction, {
    email: '',
    password: '',
  });

  return (
    <form action={formAction} className="mt-8 w-full space-y-6">
      <Input
        type="email"
        id="email"
        defaultValue={state.email}
        autoComplete="email"
        placeholder="example@email.com"
        label="Email Address"
      />
      <Input
        type="password"
        id="password"
        min={8}
        defaultValue={state.password}
        autoComplete="current-password"
        placeholder="Enter your password"
        label="Password"
      />
      <Button
        pending={pending}
        aria-live="polite"
        className="flex items-center justify-center"
      >
        Login
      </Button>

      {state.success === false && (
        <p className="text-sm text-red-500">{state.error}</p>
      )}
    </form>
  );
}
