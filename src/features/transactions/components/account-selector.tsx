import { GroupBase } from 'react-select';
import { AsyncPaginate } from 'react-select-async-paginate';

import AccountOption from '@/features/accounts/components/account-option';
import { selectorStyles } from '@/shared/utils/selector-styles';
import { loadAccounts } from '../utils/load-accounts';
import type { Option } from '@/features/accounts/models/load-user-options';

type Props = {
  id?: string;
  label?: string;
  disabled?: boolean;
  required?: boolean;
  isClearable?: boolean;
};

function AccountSelector({
  id = 'toAccountId',
  label = 'Account',
  required,
  disabled,
  isClearable,
}: Props) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor="toAccountId">{label}</label>
      <AsyncPaginate<Option, GroupBase<Option>, { page: number }>
        inputId={id}
        name={id}
        required={required}
        loadOptions={loadAccounts}
        isClearable={isClearable}
        maxMenuHeight={250}
        isDisabled={disabled}
        components={{ Option: AccountOption }}
        additional={{ page: 1 }}
        classNames={selectorStyles<Option>()}
      />
    </div>
  );
}

export default AccountSelector;
