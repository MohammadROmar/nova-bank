'use client';

import Link from 'next/link';

import InfoIcon from '@/assets/icons/info';

type ErrorType = 'HttpError' | 'UnauthorizedError' | 'ServerError' | 'Error';

const errors = {
  HttpError: {
    title: 'Request Failed',
    subtitle: 'The server returned an unexpected response. Please try again.',
  },
  UnauthorizedError: {
    title: 'Access Denied',
    subtitle:
      "Your session has expired or you don't have permission to access this resource.",
  },
  ServerError: {
    title: 'Server Unreachable',
    subtitle:
      "We couldn't connect to the server. Check your connection and try again.",
  },
  Error: {
    title: 'Something Went Wrong',
    subtitle:
      'Oops! An unexpected error occurred. You can go to home or try again.',
  },
};

export default function ErrorPage({ error }: { error: Error }) {
  const { title, subtitle } = errors[error.name as ErrorType] || errors.Error;

  return (
    <section className="flex size-full h-screen w-screen flex-col items-center justify-center space-y-4 text-center text-balance">
      <div className="bg-primary/10 flex items-center justify-center rounded-full p-3">
        <InfoIcon className="text-primary size-8" />
      </div>

      <h2 className="text-primary text-3xl font-bold">{title}</h2>
      <p className="text-sm text-gray-600">{subtitle}</p>

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
