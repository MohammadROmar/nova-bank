'use client';

import { useRouter } from 'next/navigation';
import { useState, useEffect, useActionState, useCallback } from 'react';

import { useDialog } from '@/shared/hooks/use-dialog';
import Modal from '@/shared/components/modal';
import ShieldIcon from '@/assets/icons/shield';
import Button from '@/shared/components/button';
import { logoutAction } from '../api/logout';

export default function RefreshTokens() {
  const [hasError, setHasError] = useState(false);
  const router = useRouter();
  const dialogRef = useDialog(hasError);

  const [, formAction, pending] = useActionState(logoutAction, null);

  useEffect(() => {
    async function refresh() {
      try {
        const res = await fetch('/api/users/token/refresh', {
          method: 'POST',
        });

        if (!res.ok) setHasError(true);
      } catch (e) {
        console.error(e);

        setHasError(true);
      }
    }

    refresh();

    const refreshInterval = setInterval(refresh, 25 * 60 * 1000);

    return () => {
      clearInterval(refreshInterval);
    };
  }, []);

  const handleClose = useCallback(
    async function handleClose() {
      setHasError(false);

      fetch('/api/users/token/delete', {
        method: 'DELETE',
      })
        .then(() => router.replace('/'))
        .catch((e) => console.error(e));
    },
    [router],
  );

  return (
    <Modal
      ref={dialogRef}
      title="Session Expired"
      description="Your session has expired for security reasons. Please log in again to continue managing complaints."
      onClose={handleClose}
      icon={
        <div className="bg-primary/10 rounded-full p-3">
          <ShieldIcon className="text -primary size-8" />
        </div>
      }
    >
      <form action={formAction}>
        <Button pending={pending}>Log in Again</Button>
      </form>
    </Modal>
  );
}
