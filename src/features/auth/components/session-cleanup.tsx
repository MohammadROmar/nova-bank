'use client';

import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useEffect } from 'react';

import InfoIcon from '@/assets/icons/info';
import LoadingIndicator from '@/assets/icons/loading-indicator';
import logoImg from '@/assets/images/logo.png';

type SessionCleanupProps = { hasUser: boolean };

function SessionCleanup({ hasUser }: SessionCleanupProps) {
  const router = useRouter();

  useEffect(() => {
    if (!hasUser) {
      fetch('/api/users/token/delete', {
        method: 'DELETE',
      })
        .then(() => router.replace('/'))
        .catch((e) => console.error(e));
    }
  }, [hasUser]);

  if (hasUser) {
    return null;
  }

  return (
    <section className="mx-auto flex h-screen w-screen items-center justify-center p-4 text-center lg:w-[50vw]">
      <div className="flex h-fit flex-col items-center justify-center gap-4 rounded-2xl border border-gray-200 bg-white p-4 shadow">
        <div className="mb-12 flex items-center gap-2">
          <div className="relative size-7">
            <Image
              src={logoImg}
              alt=""
              aria-hidden
              fill
              sizes="28px"
              className="object-contain object-center"
            />
          </div>
          <h1 className="text-2xl font-black tracking-tight">NovaBank</h1>
        </div>

        <div className="bg-primary/30 flex items-center justify-center rounded-full p-3">
          <InfoIcon className="text-primary size-8" />
        </div>

        <h2 className="text-heading text-4xl font-bold">Session Expired</h2>
        <p className="max-w-lg text-sm text-balance text-gray-600">
          Your session has expired. For security reasons, we are cleaning your
          session and redirecting you to the homepage.
        </p>

        <LoadingIndicator className="flex w-12 items-center justify-center text-pretty" />
      </div>
    </section>
  );
}

export default SessionCleanup;
