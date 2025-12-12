import { GroupBase } from 'react-select';
import type { LoadOptions } from 'react-select-async-paginate';

import { Account } from '../models/accounts';

type Option = Account & { label: string; value: string };
type ResponseData = {
  items: Account[];
  totalItems: number;
  pageNumber: number;
  pageSize: number;
  totalPages: number;
};
type LoadUserOptions = LoadOptions<Option, GroupBase<Option>, { page: number }>;

export const loadAccounts: LoadUserOptions = async (search, _, additional) => {
  const page = additional?.page ?? 1;

  const response = await fetch(
    `/api/accounts?pageNum=${page}${search ? `&userName=${search}` : ''}`,
  );

  const accounts = (await response.json()) as ResponseData;

  return {
    options: accounts.items.map((account) => ({
      ...account,
      label: account.userName,
      value: account.id.toString(),
    })),
    hasMore: accounts.totalPages > page,
    additional: { page: page + 1 },
  };
};
