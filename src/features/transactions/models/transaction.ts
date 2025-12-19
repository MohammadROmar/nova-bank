export interface Transaction {
  id: number;
  amount: number;
  transactionType: TransactionType;
  status: TransactionStatus;
  fromAccountId: number | null;
  toAccountId: number;
  approvedByUserId: string;
  approvedByUserName: string | null;
  approvedAt: string;
}

export type TransactionStatus =
  | 'PendingManager'
  | 'PendingAdmin'
  | 'Approved'
  | 'Rejected';

export type TransactionType =
  | 'Loan'
  | 'Routine'
  | 'Deposit'
  | 'Withdrawal'
  | 'Transfer';
