import { useState } from 'react';
import { GroupBase } from 'react-select';
import { AsyncPaginate } from 'react-select-async-paginate';

import { loadUsers } from '../api/load-users';
import { selectorStyles } from '@/shared/utils/selector-styles';

type Option = { label: string; value: string };
type Props = {
  disabled: boolean;
  changeUsername: (val: string | null) => void;
};

function UserSelector({ disabled, changeUsername }: Props) {
  const [value, setValue] = useState<Option | null | undefined>(undefined);

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor="userId">
        User <span className="text-red-500">*</span>
      </label>
      <AsyncPaginate<Option, GroupBase<Option>, { page: number }>
        value={value}
        onChange={(newVal) => {
          setValue(newVal);
          changeUsername(newVal?.label ?? null);
        }}
        inputId="userId"
        isMulti={false}
        name="userId"
        loadOptions={loadUsers}
        required
        isDisabled={disabled}
        additional={{ page: 1 }}
        classNames={selectorStyles<Option>()}
      />
    </div>
  );
}

export default UserSelector;
