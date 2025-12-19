import { formatDate } from '@/shared/utils/format-date';
import { Transaction } from '../models/transaction';

export function transactionCardDetails(transaction: Transaction) {
  return [
    { title: 'From Account', value: transaction.fromAccountId ?? '-' },
    { title: 'To Account', value: transaction.toAccountId ?? '-' },
    { title: 'Approved By', value: transaction.approvedByUserName ?? '-' },
    {
      title: 'Approve Date',
      value: transaction.approvedAt ? formatDate(transaction.approvedAt) : '-',
    },
  ];
}
