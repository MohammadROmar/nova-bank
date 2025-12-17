import { Account } from '@/features/accounts/models/accounts';

export type Transaction = {
  amount: Number;
  type: Account['type'];
  status: TransactionStatus;
  fromAccountId: number | null;
  toAccountId: number;
  approvedByUserId: string;
  approvedAt: string;
};

export type TransactionStatus =
  | 'PendingManager'
  | 'PendingAdmin'
  | 'Approved'
  | 'Rejected';
