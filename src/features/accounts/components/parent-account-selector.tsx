import dynamic from 'next/dynamic';
import { useState } from 'react';
import { GroupBase } from 'react-select';
import { AsyncPaginate } from 'react-select-async-paginate';

import { useLoadAccounts } from '../hooks/use-load-accounts';
import AccountOption from './account-option';
import SelectorSkeleton from './selector-skeleton';
import { selectorStyles } from '@/shared/utils/selector-styles';
import { Account } from '../models/accounts';
import type { Option } from '../models/load-user-options';

const UserSelector = dynamic(() => import('./user-selector'), {
  ssr: false,
  loading: () => <SelectorSkeleton />,
});

type Props = {
  id?: string;
  username: string | null;
  accountId?: number;
  parentAccount?: Account;
  disabled: boolean;
  changeUsername?: (val: string | null) => void;
};

function ParentAccountSelector({
  id,
  accountId,
  username,
  parentAccount,
  disabled,
  changeUsername,
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

  return (
    <>
      {changeUsername && (
        <UserSelector
          disabled={disabled}
          changeUsername={(val) => {
            changeUsername(val);
            setValue(null);
          }}
        />
      )}
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
          classNames={selectorStyles<Option>()}
        />
      </div>
    </>
  );
}

export default ParentAccountSelector;
