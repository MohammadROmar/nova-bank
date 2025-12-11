import type { ElementType, ReactNode } from 'react';
import clsx from 'clsx';

import user from '@/assets/icons/user';
import date from '@/assets/icons/date';
import status from '@/assets/icons/status';
import idIcon from '@/assets/icons/id';
import settings from '@/assets/icons/settings';
import { formatDate } from '@/shared/utils/format-date';
import { getAccountStateStyles } from './get-account-state-styles';
import { Account } from '../models/accounts';

export type DetailProps = {
  icon: ElementType;
  label: string;
  value: string | ReactNode;
};

export function getAccountDetails(account: Account): DetailProps[] {
  return [
    { icon: idIcon, label: 'User ID', value: account.userId },
    { icon: user, label: 'Account Holder', value: account.userName },
    {
      icon: idIcon,
      label: 'Parent Account ID',
      value: account.parentAccountId?.toString() ?? 'N/A',
    },
    {
      icon: status,
      label: 'Account State',
      value: (
        <span
          className={clsx(
            'mt-0.5 flex w-fit items-center justify-center rounded-lg px-2 text-sm',
            getAccountStateStyles(account.state),
          )}
        >
          {account.state}
        </span>
      ),
    },
    { icon: settings, label: 'Account Type', value: account.type },
    { icon: date, label: 'Date Opened', value: formatDate(account.createdAt) },
  ];
}
