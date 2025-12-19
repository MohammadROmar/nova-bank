import { toast, ToastClassnames } from 'sonner';

import { SUCCESS_TOAST_STYLE } from '@/features/dashboard/hooks/use-success-toast';
import { User } from '@/features/auth/models/user';

const SHARED_STYLES: ToastClassnames = {
  toast: SUCCESS_TOAST_STYLE.toast,
  description: 'text-gray-600! text-xs!',
};
const APPROVE_TOAST_STYLES = {
  ...SHARED_STYLES,
  icon: 'text-yellow-500',
  actionButton: 'bg-primary! text-white! px-4! py-3!',
};

interface TransactionToastStrategy {
  show(transactionType: string, role: User['role'], action: () => void): void;
}

export class ApprovedToastStrategy implements TransactionToastStrategy {
  show(transactionType: string) {
    toast.success(`${transactionType} Successful`, {
      classNames: SUCCESS_TOAST_STYLE,
    });
  }
}

export class RejectedToastStrategy implements TransactionToastStrategy {
  show(transactionType: string) {
    toast.error(`${transactionType} Rejected`, {
      description: 'Amount exceeded allowed limit.',
      classNames: { ...SHARED_STYLES, icon: 'text-red-500' },
    });
  }
}

export class PendingManagerToastStrategy implements TransactionToastStrategy {
  show(transactionType: string, _: User['role'], action: () => void) {
    toast.warning(`${transactionType} Pending`, {
      description: 'Requires Approval',
      action: {
        label: 'Approve',
        onClick: action,
      },
      classNames: APPROVE_TOAST_STYLES,
    });
  }
}

export class PendingAdminToastStrategy implements TransactionToastStrategy {
  show(transactionType: string, role: User['role'], action: () => void) {
    const isAdmin = role === 'Administrator';

    toast.warning(`${transactionType} Pending`, {
      description: 'Requires Admin Approval',
      action: isAdmin
        ? {
            label: 'Approve',
            onClick: action,
          }
        : undefined,
      classNames: APPROVE_TOAST_STYLES,
    });
  }
}

export const strategies: Record<string, TransactionToastStrategy> = {
  Approved: new ApprovedToastStrategy(),
  Rejected: new RejectedToastStrategy(),
  PendingManager: new PendingManagerToastStrategy(),
  PendingAdmin: new PendingAdminToastStrategy(),
};
