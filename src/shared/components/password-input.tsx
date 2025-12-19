'use client';

import { useState, useMemo, type ComponentProps } from 'react';
import clsx from 'clsx';

import Input from './input';
import XIcon from '@/assets/icons/close';
import CheckMark from '@/assets/icons/check-mark';
import { REQUIREMENTS } from '../data/password-req';

type InputProps = { label: string } & ComponentProps<'input'>;

function PasswordInput(props: InputProps) {
  const [password, setPassword] = useState('');

  return (
    <div className="space-y-2">
      <Input
        id="password"
        autoComplete="new-password"
        type="password"
        min={8}
        {...props}
        value={password}
        onChange={(e) => setPassword(e.currentTarget.value)}
      />

      <PasswordRules password={password} />
    </div>
  );
}

function PasswordRules({ password }: { password: string }) {
  const results = useMemo(() => {
    return REQUIREMENTS.map((req) => ({
      key: req.key,
      label: req.label,
      passed: req.test(password),
    }));
  }, [password]);

  return (
    <ul className="grid grid-cols-1 gap-x-4 gap-y-2 text-sm text-gray-600 md:grid-cols-2">
      {results.map(({ key, passed, label }) => (
        <li key={key} className="flex items-center gap-2">
          <span
            className={clsx(
              'flex items-center justify-center overflow-hidden rounded-full p-1 text-white',
              passed ? 'bg-green-600' : 'bg-red-600',
            )}
          >
            {passed ? (
              <CheckMark className="size-1.5 scale-200" />
            ) : (
              <XIcon className="size-1.5" />
            )}
          </span>
          <span className={passed ? 'text-green-600' : undefined}>{label}</span>
        </li>
      ))}
    </ul>
  );
}

export default PasswordInput;
