'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Breadcrumbs() {
  const pathname = usePathname();

  const segments = pathname.split('/').filter(Boolean);

  return (
    <ol className="flex flex-wrap text-sm text-gray-600">
      {segments.map((segment, i) => {
        const isLast = i === segments.length - 1;

        const href = `/${segments.slice(0, i + 1).join('/')}`;

        return (
          <li key={segment} className="flex">
            <Link
              href={href}
              className="capitalize underline underline-offset-2"
            >
              {segment.replace('-', ' ')}
            </Link>
            {!isLast && (
              <span aria-hidden className="px-3 sm:px-4">
                /
              </span>
            )}
          </li>
        );
      })}
    </ol>
  );
}
