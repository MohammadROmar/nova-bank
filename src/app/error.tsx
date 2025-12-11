'use client';

import Link from 'next/link';

import InfoIcon from '@/assets/icons/info';

export default function ErrorPage({ error }: { error: Error }) {
  let title = 'Something Went Wrong';
  let subtitle =
    ' Oops! An un expected error occurred. You can got to home or try again.';

  if (error.name === 'HttpError') {
    title = 'Request Failed';
    subtitle = 'The server returned an unexpected response. PLease try again.';
  } else if (error.name === 'UnauthorizedError') {
    title = 'Access Denied';
    subtitle =
      "Your session has expired or you don't have permission to access this resource";
  } else if (error.name === 'ServerError') {
    title = 'Server Unreachable';
    subtitle =
      "We couldn't connect to the server. Check your connection and try again.";
  }

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
