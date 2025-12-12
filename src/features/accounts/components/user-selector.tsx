import { AsyncPaginate } from 'react-select-async-paginate';

import { loadUsers } from '../api/load-users';
import { selectorStyles } from '@/shared/utils/selector-styles';

function UserSelector({ disabled }: { disabled: boolean }) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor="userId">
        User <span className="text-red-500">*</span>
      </label>
      <AsyncPaginate
        inputId="userId"
        name="userId"
        loadOptions={loadUsers}
        required
        isDisabled={disabled}
        additional={{ page: 1 }}
        classNames={selectorStyles}
      />
    </div>
  );
}

export default UserSelector;
