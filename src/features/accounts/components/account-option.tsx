import { components, OptionProps } from 'react-select';
import clsx from 'clsx';

import { getAccountStateStyles } from '../utils/get-account-state-styles';
import { formatBalance } from '../utils/format-balance';
import type { Option } from '../models/load-user-options';

function AccountOption(props: OptionProps<Option>) {
  const { data } = props;

  return (
    <components.Option {...props}>
      <div className="flex flex-wrap items-center gap-1">
        <p className="max-w-1/2 truncate">
          <span className="font-medium">{data.userName}</span>{' '}
        </p>
        <p className="text-sm opacity-60">(ID: {data.id})</p>

        <div className="flex flex-1 justify-end">
          <p
            className={clsx(
              'mt-0.5 flex w-fit items-center justify-center rounded-lg px-2 text-sm',
              getAccountStateStyles(data.state),
            )}
          >
            {data.state}
          </p>
        </div>
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

export default AccountOption;
