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
          'button flex items-center gap-2 py-3',
          !isActive && 'bg-transparent font-normal text-current!',
        )}
      >
        <span>{icon}</span>
        <span>{label}</span>
      </Link>
    </li>
  );
}

export default SidebarLink;
