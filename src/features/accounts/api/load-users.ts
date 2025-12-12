import { GroupBase } from 'react-select';
import type { LoadOptions } from 'react-select-async-paginate';

type Option = { label: string; value: string };
type Additional = { page: number };

type LoadUserOptions = LoadOptions<Option, GroupBase<Option>, Additional>;

type ResponseData = {
  items: { id: string; userName: string }[];
  totalItems: number;
  pageNumber: number;
  pageSize: number;
  totalPages: number;
};

export const loadUsers: LoadUserOptions = async (search, _, additional) => {
  const page = additional?.page ?? 1;

  const response = await fetch(
    `/api/users?page=${page}${search ? `&userName=${search}` : ''}`,
  );

  const users = (await response.json()) as ResponseData;

  return {
    options: users.items.map((user) => ({
      value: user.id,
      label: user.userName,
    })),
    hasMore: users.totalPages > page,
    additional: { page: page + 1 },
  };
};
