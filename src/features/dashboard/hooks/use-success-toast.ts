'use client';

import { useEffect, type DependencyList } from 'react';
import { toast } from 'sonner';

export function useSuccessToast(
  message: string,
  showToast: boolean = false,
  deps: DependencyList,
) {
  useEffect(() => {
    if (showToast) {
      toast.success(message, {
        classNames: {
          toast: 'bg-white! rounded-2xl! border-gray-200!',
          icon: 'text-green-500',
        },
      });
    }
  }, deps);
}
