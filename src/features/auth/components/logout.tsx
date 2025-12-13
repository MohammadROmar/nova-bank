'use client';

import { useActionState, useState } from 'react';

import { useDialog } from '@/shared/hooks/use-dialog';
import Modal from '@/shared/components/modal';
import LogoutIcon from '@/assets/icons/logout';
import Button from '@/shared/components/button';
import { logoutAction } from '../api/logout';

export default function Logout() {
  const [, formAction, pending] = useActionState(logoutAction, null);

  const [isOpen, setIsOpen] = useState(false);
  const dialogRef = useDialog(isOpen);

  return (
    <>
      <Modal
        ref={dialogRef}
        title="Logout"
        description="Are you sure you want to logout?"
        onClose={() => setIsOpen(false)}
        icon={
          <div className="rounded-full bg-red-100 p-3">
            <LogoutIcon className="size-8 text-red-500" />
          </div>
        }
      >
        <form
          action={formAction}
          className="flex items-center gap-2 max-md:flex-col"
        >
          <Button
            pending={pending}
            className="flex items-center justify-center bg-red-500 focus:outline-red-500"
            style={{ backgroundImage: 'none' }}
          >
            Logout
          </Button>
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            disabled={pending}
            className="button border-gray-w00 border bg-transparent font-normal text-current!"
          >
            Cancel
          </button>
        </form>
      </Modal>

      <button
        onClick={() => setIsOpen(true)}
        className="button flex cursor-pointer gap-2 bg-transparent p-4 font-normal text-red-500! focus:outline-red-500"
      >
        <span>
          <LogoutIcon className="size-6 shrink-0" />
        </span>
        <span>Logout</span>
      </button>
    </>
  );
}
