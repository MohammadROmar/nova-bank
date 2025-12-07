import { cookies } from 'next/headers';
import { notFound } from 'next/navigation';
import type { PropsWithChildren } from 'react';

import { AuthFacade } from '@/core/facades/auth';
import AuthLayout from '@/features/auth/components/auth-layout';
import UserRoleContextProvider from '@/shared/store/role';
import SessionCleanup from '@/features/auth/components/session-cleanup';
import { User } from '@/features/auth/models/user';

export const dynamic = 'force-dynamic';

async function DashboardLayout({ children }: PropsWithChildren) {
  const token = (await cookies()).get('token')?.value;

  if (!token) return notFound();

  let user: User | null = null;

  try {
    if (token) {
      user = await AuthFacade.getCurrentUser(token);
    }
  } catch (e) {
    console.log(e);
  }

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
