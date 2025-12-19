import type { ElementType } from 'react';

import deposit from '@/assets/icons/deposit';
import loan from '@/assets/icons/loan';
import update from '@/assets/icons/update';
import transfer from '@/assets/icons/transfer';
import withdraw from '@/assets/icons/withdraw';
import { Transaction } from '../models/transaction';

export const transactionTypeStyles: Record<
  Transaction['transactionType'],
  { icon: ElementType; className: string }
> = {
  Deposit: { icon: deposit, className: 'bg-green-100 text-green-600' },
  Loan: { icon: loan, className: 'bg-amber-100 text-amber-600' },
  Routine: { icon: update, className: 'bg-gray-100 text-gray-600' },
  Transfer: { icon: transfer, className: 'bg-blue-100 text-blue-600' },
  Withdrawal: { icon: withdraw, className: 'bg-purple-100 text-purple-600' },
};

export const transactionStatusStyles: Record<Transaction['status'], string> = {
  Approved: 'bg-green-100 text-green-600 border-green-400',
  PendingAdmin: 'bg-orange-100 text-orange-600 border-orange-400',
  PendingManager: 'bg-yellow-100 text-yellow-600 border-yellow-400',
  Rejected: 'bg-rose-100 text-rose-600 border-rose-400',
};
