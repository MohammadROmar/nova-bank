import { cookies } from 'next/headers';
import { notFound } from 'next/navigation';
import type { PropsWithChildren } from 'react';

import AuthLayout from '@/features/auth/components/auth-layout';
import UserRoleContextProvider from '@/shared/store/role';
import SessionCleanup from '@/features/auth/components/session-cleanup';
import { AuthFacade } from '@/core/facades/auth';

export const dynamic = 'force-dynamic';

async function DashboardLayout({ children }: PropsWithChildren) {
  const token = (await cookies()).get('token')?.value;
  if (!token) return notFound();

  const user = await AuthFacade.getCurrentUser(token);

  return (
    <>
      {user ? (
        <AuthLayout role={user.role}>
          <UserRoleContextProvider role={user.role}>
            {children}
          </UserRoleContextProvider>
        </AuthLayout>
      ) : (
        <SessionCleanup hasUser={!!user} />
      )}
    </>
  );
}

export default DashboardLayout;
