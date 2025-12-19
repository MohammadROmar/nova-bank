import dynamic from 'next/dynamic';
import { useMemo } from 'react';

import SelectorSkeleton from '@/features/accounts/components/selector-skeleton';
import { selectorStyles } from '@/shared/utils/selector-styles';

const Select = dynamic(() => import('react-select'), {
  ssr: false,
  loading: () => <SelectorSkeleton />,
});

type Option = { value: string; label: string };

type SelectorProps = {
  id: string;
  label: string;
  isDisabled?: boolean;
  defaultValue?: Option;
  options: Option[];
  isClearable?: boolean;
};

function Selector({
  id,
  label,
  options,
  defaultValue,
  isDisabled,
  isClearable = true,
}: SelectorProps) {
  return (
    <div className="flex w-full flex-col gap-2">
      <label htmlFor={id}>{label}</label>
      <Select
        inputId={id}
        name={id}
        maxMenuHeight={150}
        isClearable={isClearable}
        isDisabled={isDisabled}
        isSearchable
        options={options}
        classNames={selectorStyles<unknown>()}
        defaultValue={defaultValue}
      />
    </div>
  );
}

export function TransactionTypeSelector() {
  const options = useMemo(
    () => [
      { value: 'Loan', label: 'Loan' },
      { value: 'Routine', label: 'Routine' },
      { value: 'Deposit', label: 'Deposit' },
      { value: 'Withdrawal', label: 'Withdrawal' },
      { value: 'Transfer', label: 'Transfer' },
    ],
    [],
  );

  return <Selector id="type" label="Type" options={options} />;
}

type StatusSelectorProps = {
  disabled?: boolean;
  isClearable?: boolean;
  defaultValue?: Option;
};

export function TransactionStatusSelector({
  disabled,
  isClearable,
  defaultValue,
}: StatusSelectorProps) {
  const options = useMemo(
    () => [
      { value: 'Approved', label: 'Approved' },
      { value: 'Rejected', label: 'Rejected' },
      { value: 'PendingManager', label: 'Pending Manager' },
      { value: 'PendingAdmin', label: 'Pending Admin' },
    ],
    [],
  );

  return (
    <Selector
      id="status"
      label="Status"
      isDisabled={disabled}
      isClearable={isClearable}
      options={options}
      defaultValue={defaultValue}
    />
  );
}
