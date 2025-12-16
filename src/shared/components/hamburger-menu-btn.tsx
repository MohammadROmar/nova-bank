'use client';

import { useSidebarContext } from '../store/sidebar';
import HamburgerIcon from '@/assets/icons/hamburger';
import CloseIcon from '@/assets/icons/close';
import { memo } from 'react';

type CloseMenuProps = { onClose: () => void };

export default function HamburgerMenuBtn() {
  const { isOpen, setIsOpen } = useSidebarContext();

  return (
    <button
      aria-label="Open sidebar"
      title="Open sidebar"
      aria-controls="sidebar"
      aria-expanded={isOpen}
      onClick={() => setIsOpen(true)}
      className="cursor-pointer lg:hidden"
    >
      <HamburgerIcon className="size-7 shrink-0" />
    </button>
  );
}

export const CloseMenu = memo(function CloseMenu({ onClose }: CloseMenuProps) {
  return (
    <button
      aria-label="Close sidebar"
      title="Close sidebar"
      aria-controls="sidebar"
      aria-expanded="true"
      onClick={onClose}
      className="cursor-pointer lg:hidden"
    >
      <CloseIcon className="size-5.5 shrink-0 text-white lg:hidden" />
    </button>
  );
});
