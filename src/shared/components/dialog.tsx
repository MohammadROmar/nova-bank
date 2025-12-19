'use client';

import { createPortal } from 'react-dom';
import clsx from 'clsx';

import type { ModalProps } from './modal';

function Modal({
  title,
  description,
  titleStyles,
  children,
  icon,
  ...props
}: ModalProps) {
  return createPortal(
    <dialog
      aria-modal
      aria-live="polite"
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
      {...props}
      className={clsx(
        'animate-fade-in fixed top-1/2 w-fit -translate-1/2 overflow-x-hidden overflow-y-auto rounded-2xl border border-gray-200 bg-white p-4 backdrop:bg-black/50 backdrop:backdrop-blur-sm backdrop:supports-backdrop-filter:bg-black/30 max-sm:w-full sm:max-w-lg sm:min-w-md ltr:left-1/2 rtl:right-1/2 rtl:translate-x-1/2',
        props.className,
      )}
    >
      {icon && (
        <div className="mb-2 flex items-center justify-center">{icon}</div>
      )}

      <h4
        id="modal-title"
        className={clsx('text-center text-2xl font-bold', titleStyles)}
      >
        {title}
      </h4>
      {description && (
        <p
          id="modal-description"
          className="mt-1 text-center text-sm text-balance whitespace-pre-wrap text-gray-600"
        >
          {description}
        </p>
      )}
      <div className="mt-4">{children}</div>
    </dialog>,
    document.getElementById('modals')!,
  );
}

export default Modal;
