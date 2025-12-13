import { GroupBase } from 'react-select';
import { LoadOptions } from 'react-select-async-paginate';

import { Account } from './accounts';

export type LoadUserOptions = LoadOptions<
  Option,
  GroupBase<Option>,
  { page: number }
>;
export type Option = Account & { label: string; value: string };
