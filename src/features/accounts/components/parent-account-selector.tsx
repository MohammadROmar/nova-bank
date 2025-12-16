import { useEffect, useState } from 'react';
import { components, GroupBase, OptionProps } from 'react-select';
import { AsyncPaginate } from 'react-select-async-paginate';
import clsx from 'clsx';

import { useLoadAccounts } from '../hooks/use-load-accounts';
import { selectorStyles } from '@/shared/utils/selector-styles';
import { getAccountStateStyles } from '../utils/get-account-state-styles';
import { formatBalance } from '../utils/format-balance';
import { Account } from '../models/accounts';
import type { Option } from '../models/load-user-options';

type Props = {
  id?: string;
  username: string | null;
  accountId?: number;
  parentAccount?: Account;
  disabled: boolean;
};

function ParentAccountSelector({
  id,
  accountId,
  username,
  parentAccount,
  disabled,
}: Props) {
  const defaultOption = parentAccount
    ? {
        ...parentAccount,
        label: `${parentAccount.userName}, ID: ${parentAccount.id}`,
        value: parentAccount.id.toString(),
      }
    : null;

  const [value, setValue] = useState<Option | null>(defaultOption);
  const loadAccounts = useLoadAccounts({ username, accountId });

  useEffect(() => {
    setValue(defaultOption);
  }, [username]);

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor="parentId">Parent Account</label>
      <AsyncPaginate<Option, GroupBase<Option>, { page: number }>
        value={value}
        onChange={(newVal) => setValue(newVal)}
        inputId="parentId"
        name="parentId"
        cacheUniqs={[id, username]}
        isClearable
        loadOptions={loadAccounts}
        isSearchable={false}
        isDisabled={disabled}
        components={{ Option: AccountOption }}
        additional={{ page: 1 }}
        classNames={selectorStyles}
      />
    </div>
  );
}

function AccountOption(props: OptionProps<Option>) {
  const { data } = props;

  return (
    <components.Option {...props}>
      <div className="flex justify-between">
        <p>
          <span className="font-medium">{data.userName}</span>{' '}
          <span className="text-sm opacity-60">(ID: {data.id})</span>
        </p>
        <p
          className={clsx(
            'mt-0.5 flex w-fit items-center justify-center rounded-lg px-2 text-sm',
            getAccountStateStyles(data.state),
          )}
        >
          {data.state}
        </p>
      </div>
      <div className="mt-2 flex flex-col gap-2 text-xs">
        <div className="flex flex-wrap items-center gap-2">
          <p className="flex-1">
            <span className="opacity-60">Type:</span>{' '}
            <span className="font-medium">{data.type}</span>
          </p>
          <p className="flex-1">
            <span className="opacity-60">Parent Account: </span>{' '}
            <span className="font-medium">{data.parentAccountId ?? 'N/A'}</span>
          </p>
        </div>
        <p className="flex items-end gap-2">
          <span className="text-xs leading-none font-medium tracking-tight opacity-60">
            BALANCE
          </span>
          <span className="text-xl leading-none font-bold">
            {formatBalance(data.balance)}
          </span>
        </p>
      </div>
    </components.Option>
  );
}

export default ParentAccountSelector;
