'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import type { ReactNode } from 'react';
import { isActiveTab } from '../utils/is-active-tab';

type SidebarLinkProps = {
  label: string;
  href: string;
  icon: ReactNode;
  onNvaigate: () => void;
};

function SidebarLink({ label, href, icon, onNvaigate }: SidebarLinkProps) {
  const pathname = usePathname();

  const isActive = isActiveTab(pathname, href);

  return (
    <li>
      <Link
        href={href}
        onNavigate={onNvaigate}
        className={clsx(
          'flex items-center gap-2 rounded-2xl border border-transparent px-4 py-3 text-white/50 transition-all duration-500 hover:scale-98 hover:text-white',
          isActive && 'border-gray-200 bg-white/15 font-medium text-white!',
        )}
      >
        <span>{icon}</span>
        <span>{label}</span>
      </Link>
    </li>
  );
}

export default SidebarLink;
