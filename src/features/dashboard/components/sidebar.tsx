'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useMemo, memo } from 'react';
import clsx from 'clsx';

import { useSidebarContext } from '../../../shared/store/sidebar';
import SidebarLink from './sidebar-link';
import Logout from '@/features/auth/components/logout';
import { CloseMenu } from '../../../shared/components/hamburger-menu-btn';
import { getSidebarTabs } from '../utils/get-sidebar-tabs';
import logoImg from '@/assets/images/logo.png';

type SidebarProps = { role: 'Administrator' | 'Manager' };

function Sidebar({ role }: SidebarProps) {
  const { isOpen, setIsOpen } = useSidebarContext();

  const tabs = useMemo(() => getSidebarTabs(role), []);

  return (
    <>
      {isOpen && <Backdrop onClose={() => setIsOpen(false)} />}

      <aside
        id="sidebar"
        aria-live="polite"
        className={clsx(
          'bg-primary fixed inset-y-0 z-50 max-h-screen w-80 max-w-[90vw] border-r border-gray-200 transition-transform duration-500 lg:sticky lg:top-0 ltr:left-0 max-lg:ltr:-translate-x-full rtl:right-0 max-lg:rtl:translate-x-full',
          isOpen && 'translate-x-0!',
        )}
      >
        <nav className="grid h-full grid-rows-[auto_auto_1fr]">
          <SidebarHeader
            title="NovaBank"
            isOpen={isOpen}
            onClose={() => setIsOpen(false)}
          />

          <ul className="space-y-2 p-4">
            {tabs.map((tab) => (
              <SidebarLink
                key={tab.href}
                {...tab}
                onNvaigate={() => setIsOpen(false)}
                icon={<tab.icon className="size-6 shrink-0" />}
              />
            ))}
          </ul>

          <SidebarFooter />
        </nav>
      </aside>
    </>
  );
}

const Backdrop = memo(function Backdrop({ onClose }: { onClose: () => void }) {
  return (
    <div
      aria-hidden
      onClick={onClose}
      className="fixed inset-0 z-40 h-screen w-screen bg-black/50 backdrop-blur-sm supports-backdrop-filter:bg-black/25 lg:hidden"
    />
  );
});

const SidebarHeader = memo(function SidebarHeader({
  title,
  isOpen,
  onClose,
}: {
  title: string;
  isOpen: boolean;
  onClose: () => void;
}) {
  return (
    <div className="flex items-center justify-between p-4">
      <Link href="/dashboard" className="flex items-center gap-2">
        <div className="relative size-6">
          <Image
            src={logoImg}
            alt=""
            aria-hidden
            fill
            sizes="28px"
            priority
            className="object-contain object-center brightness-0 contrast-200 invert"
          />
        </div>
        <h1 className="text-2xl leading-none font-black tracking-tighter text-white">
          {title}
        </h1>
      </Link>

      {isOpen && <CloseMenu onClose={onClose} />}
    </div>
  );
});

const SidebarFooter = memo(function SidebarFooter() {
  return (
    <div className="m-4 flex flex-col justify-end space-y-2">
      <Logout />
    </div>
  );
});

export default Sidebar;
