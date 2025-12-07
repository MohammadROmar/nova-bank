'use client';

import Link from 'next/link';

import InfoIcon from '@/assets/icons/info';

export default function ErrorPage() {
  return (
    <section className="flex size-full h-screen w-screen flex-col items-center justify-center space-y-4 text-center text-balance">
      <div className="bg-primary/10 flex items-center justify-center rounded-full p-3">
        <InfoIcon className="text-primary size-8" />
      </div>

      <h2 className="text-primary text-3xl font-bold">Something Went Wrong</h2>
      <p className="text-sm text-gray-600">
        Oops! An un expected error occurred. You can got to home or try again.
      </p>

      <div className="flex items-center gap-4">
        <Link href="/" className="button text-nowrap">
          Go Home
        </Link>
        <button
          onClick={() => window.location.reload()}
          className="button border bg-none text-nowrap"
        >
          Refresh Page
        </button>
      </div>
    </section>
  );
}
