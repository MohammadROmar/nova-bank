'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useMemo } from 'react';

import { generatePageNumbers } from '../utils/generate-page-numbers';
import ArrowLeftIcon from '@/assets/icons/arrow-left';
import Link from 'next/link';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  maxButtons?: number;
  basePath?: string;
}

export default function Pagination({
  currentPage,
  totalPages,
  maxButtons = 7,
  basePath = '',
}: PaginationProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const params = useMemo(() => {
    const p = new URLSearchParams(Array.from(searchParams.entries()));
    return p;
  }, [searchParams]);

  const pageNumbers = useMemo(
    () => generatePageNumbers(currentPage, totalPages, maxButtons),
    [currentPage, totalPages, maxButtons],
  );

  function buildHref(page: number) {
    const newParams = new URLSearchParams(params);
    newParams.set('pageNum', String(page));

    const queryString = newParams.toString();
    return `${basePath}${queryString ? `?${queryString}` : ''}`;
  }

  return (
    <nav className="flex w-fit items-center overflow-hidden rounded-2xl border border-gray-200 bg-white">
      <button
        onClick={() => {
          const prev = Math.max(1, currentPage - 1);

          router.push(buildHref(prev));
        }}
        disabled={currentPage === 1 || totalPages === 0}
        aria-disabled={currentPage === 1 || totalPages === 0}
        className="size-full cursor-pointer border-gray-200 p-2 disabled:cursor-not-allowed disabled:text-current/50 ltr:border-r rtl:border-l"
      >
        <ArrowLeftIcon className="size-4 rtl:rotate-180" />
      </button>

      {pageNumbers.map((page, idx) => {
        if (page === 'ellipsis') {
          return (
            <span
              key={`ellipsis-${idx}`}
              className="pointer-events-none border-gray-200 p-2 select-none ltr:border-r rtl:border-l"
            >
              …
            </span>
          );
        }

        const pageNum = page;

        return (
          <Link
            key={pageNum}
            href={buildHref(pageNum)}
            aria-current={pageNum === currentPage ? 'page' : undefined}
          >
            <button
              className={`flex cursor-pointer border-gray-200 px-3 py-2 ltr:border-r rtl:border-l ${pageNum === currentPage ? 'bg-primary text-white' : ''}`}
            >
              {pageNum}
            </button>
          </Link>
        );
      })}

      <button
        onClick={() => {
          const next = Math.min(totalPages, currentPage + 1);
          router.push(buildHref(next));
        }}
        disabled={currentPage === totalPages || totalPages === 0}
        aria-disabled={currentPage === totalPages || totalPages === 0}
        className="cursor-pointer p-2 disabled:cursor-not-allowed disabled:text-current/50"
      >
        <ArrowLeftIcon className="size-4 ltr:rotate-180" />
      </button>
    </nav>
  );
}
