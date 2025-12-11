import type { AccountState } from './state';
import type { AccountType } from './type';

export interface Account {
  id: number;
  userId: string;
  userName: string;
  parentAccountId: number | null;
  state: AccountState;
  type: AccountType;
  createdAt: string;
  balance: number;
  children: Account[];
}
