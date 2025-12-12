import checking from '@/assets/icons/checking';
import investment from '@/assets/icons/investment';
import loan from '@/assets/icons/loan';
import saving from '@/assets/icons/saving';

export const accountTypes = [
  {
    id: 0,
    name: 'Saving',
    description: 'Store money and earn small interest.',
    icon: saving,
  },
  {
    id: 1,
    name: 'Checking',
    description: 'For everyday spending and transactions.',
    icon: checking,
  },
  {
    id: 2,
    name: 'Loan',
    description: 'Borrowed money repaid with interest.',
    icon: loan,
  },
  {
    id: 3,
    name: 'Investment',
    description: 'Grows money through market assets.',
    icon: investment,
  },
];
