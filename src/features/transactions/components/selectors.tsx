import dynamic from 'next/dynamic';

import SelectorSkeleton from '@/features/accounts/components/selector-skeleton';
import { selectorStyles } from '@/shared/utils/selector-styles';
import { useMemo } from 'react';

const Select = dynamic(() => import('react-select'), {
  ssr: false,
  loading: () => <SelectorSkeleton />,
});

type SelectorProps = {
  id: string;
  label: string;
  options: { value: string; label: string }[];
};

function Selector({ id, label, options }: SelectorProps) {
  return (
    <div className="flex w-full flex-col gap-2">
      <label htmlFor={id}>{label}</label>
      <Select
        inputId={id}
        name={id}
        maxMenuHeight={150}
        isClearable
        isSearchable
        options={options}
        classNames={selectorStyles}
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

export function TransactionStatusSelector() {
  const options = useMemo(
    () => [
      { value: 'Approved', label: 'Approved' },
      { value: 'Rejected', label: 'Rejected' },
      { value: 'PendingManager', label: 'Pending Manager' },
      { value: 'PendingAdmin', label: 'Pending Admin' },
    ],
    [],
  );

  return <Selector id="status" label="Status" options={options} />;
}
