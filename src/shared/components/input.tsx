import clsx from 'clsx';
import { ComponentProps } from 'react';

type InputProps = { label: string } & ComponentProps<'input'>;

function Input({ label, id, ...props }: InputProps) {
  return (
    <div className="flex w-full flex-col gap-2">
      <label htmlFor={id}>{label}</label>

      <input
        id={id}
        name={id}
        required
        {...props}
        className={clsx('input', props.className)}
      />
    </div>
  );
}

export default Input;
