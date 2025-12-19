import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

import { strategies } from '../strategy/transaction-toast-strategy';
import { User } from '@/features/auth/models/user';
import type { ActionState } from '../models/action-state';

type Props = {
  role: User['role'];
  transactionType: string;
  state: ActionState;
};

export function useTransactionToast({ role, state, transactionType }: Props) {
  const router = useRouter();

  useEffect(() => {
    if (!state.success || !state.transaction) return;

    const strategy = strategies[state.transaction.status];
    if (!strategy) return;

    strategy.show(transactionType, role, () =>
      router.push(`/dashboard/transactions/${state.transaction?.id}`),
    );
  }, [state]);
}
