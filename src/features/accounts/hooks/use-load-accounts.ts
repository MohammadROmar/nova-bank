'use client';

import { useCallback } from 'react';

import { Account } from '../models/accounts';
import type { LoadUserOptions, Option } from '../models/load-user-options';

type ResponseData = {
  items: Account[];
  totalItems: number;
  pageNumber: number;
  pageSize: number;
  totalPages: number;
};

type Props = { username: string | null; accountId?: number };

export function useLoadAccounts({ username, accountId }: Props) {
  const loadAccounts: LoadUserOptions = useCallback(
    async (_, __, additional) => {
      if (!username || username.trim().length === 0) {
        return {
          options: [],
          hasMore: false,
        };
      }

      const page = additional?.page ?? 1;

      const response = await fetch(
        `/api/accounts?pageNum=${page}${username ? `&userName=${username}` : ''}`,
      );

      const accounts = (await response.json()) as ResponseData;

      const options: Option[] = accounts.items
        .filter((account) => account.id !== accountId)
        .map((account) => ({
          ...account,
          label: `${account.userName}, ID: ${account.id}`,
          value: account.id.toString(),
        }));

      return {
        options,
        hasMore: accounts.totalPages > page,
        additional: { page: page + 1 },
      };
    },
    [username],
  );

  return loadAccounts;
}
