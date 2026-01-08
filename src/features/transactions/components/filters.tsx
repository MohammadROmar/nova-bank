'use client';

import Link from 'next/link';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { useDialog } from '@/shared/hooks/use-dialog';
import Input from '@/shared/components/input';
import Button from '@/shared/components/button';
import Modal from '@/shared/components/modal';
import FiltersIcon from '@/assets/icons/filters';
import SelectorSkeleton from '@/features/accounts/components/selector-skeleton';
import {
  TransactionTypeSelector,
  TransactionStatusSelector,
} from './selectors';
import { handleFilters } from '../utils/handle-filters';

const AccountSelector = dynamic(() => import('./account-selector'), {
  ssr: false,
  loading: () => <SelectorSkeleton />,
});
export default function TransactionsFilters() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <FiltersModal isOpen={isOpen} setIsOpen={setIsOpen} />

      <div className="flex items-center">
        <Button
          onClick={() => setIsOpen(true)}
          className="mr-4 flex w-fit items-center gap-2"
        >
          <span>
            <FiltersIcon className="size-5" />
          </span>
          <span>Filters</span>
        </Button>

        <div className="border-l border-l-gray-600 pl-4 text-sm text-gray-600">
          <Link href="/dashboard/transactions">Unset</Link>
        </div>
      </div>
    </>
  );
}

type FiltersModalProps = { isOpen: boolean; setIsOpen: (val: boolean) => void };

function FiltersModal({ isOpen, setIsOpen }: FiltersModalProps) {
  const dialog = useDialog(isOpen);
  const router = useRouter();

  return (
    <Modal
      ref={dialog}
      title="Filter Transactions"
      icon={
        <div className="bg-primary/10 rounded-full p-3">
          <FiltersIcon className="text-primary size-8" />
        </div>
      }
      onClose={() => setIsOpen(false)}
      className="w-full! lg:max-w-3xl!"
    >
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const query = handleFilters(e.currentTarget);
          router.push(`/dashboard/transactions?${query}`);
          setIsOpen(false);
        }}
        className="flex flex-col gap-6"
      >
        <fieldset className="space-y-4">
          <legend className="text-xs font-semibold text-gray-600">
            ACCOUNT REFRENSES
          </legend>

          <AccountSelector id="accountId" isClearable />
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            <Input
              id="from"
              label="From Account"
              type="date"
              min="2025-01-01"
              max="2028-12-31"
              required={false}
            />
            <Input
              id="to"
              label="To Account"
              type="date"
              min="2025-01-01"
              max="2028-12-31"
              required={false}
            />
          </div>
        </fieldset>

        <hr className="text-gray-200" />

        <fieldset className="space-y-4">
          <legend className="text-xs font-semibold text-gray-600">
            TRANSACTION DETAILS
          </legend>

          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            <TransactionTypeSelector />
            <TransactionStatusSelector />
          </div>
        </fieldset>
        <div className="flex items-center gap-2 max-md:flex-col">
          <Button type="submit">Search</Button>
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="button border-gray-w00 border bg-transparent font-normal text-current!"
          >
            Cancel
          </button>
        </div>
      </form>
    </Modal>
  );
}
