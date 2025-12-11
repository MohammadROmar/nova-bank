import { Toaster } from 'sonner';
import type { PropsWithChildren } from 'react';

import SidebarContextProvider from '@/shared/store/sidebar';
import Sidebar from '@/features/dashboard/components/sidebar';
import Header from '@/features/dashboard/components/header';
import RefreshTokens from '@/features/auth/components/refresh-tokens';

type AuthLayoutProps = {
  role: 'Administrator' | 'Manager';
} & PropsWithChildren;

function AuthLayout({ role, children }: AuthLayoutProps) {
  return (
    <SidebarContextProvider>
      <div className="min-h-screen grid-cols-[auto_auto_auto_1fr] lg:grid">
        <Toaster position="top-center" className="font-inter!" />
        <div id="modals" />
        <Sidebar role={role} />
        <div className="grid size-full grid-rows-[auto_1fr]">
          <Header />
          <main className="m-auto grid size-full max-w-6xl overflow-auto p-4 lg:p-8">
            {children}
          </main>
        </div>

        <RefreshTokens />
      </div>
    </SidebarContextProvider>
  );
}

export default AuthLayout;
