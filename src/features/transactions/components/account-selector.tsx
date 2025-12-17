import { GroupBase } from 'react-select';
import { AsyncPaginate } from 'react-select-async-paginate';

import AccountOption from '@/features/accounts/components/account-option';
import { selectorStyles } from '@/shared/utils/selector-styles';
import { loadAccounts } from '../utils/load-accounts';
import type { Option } from '@/features/accounts/models/load-user-options';

type Props = { disabled: boolean };

function AccountSelector({ disabled }: Props) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor="toAccountId">Account</label>
      <AsyncPaginate<Option, GroupBase<Option>, { page: number }>
        inputId="toAccountId"
        name="toAccountId"
        loadOptions={loadAccounts}
        maxMenuHeight={250}
        isDisabled={disabled}
        components={{ Option: AccountOption }}
        additional={{ page: 1 }}
        classNames={selectorStyles}
      />
    </div>
  );
}

export default AccountSelector;
