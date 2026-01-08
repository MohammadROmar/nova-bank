import { Metadata } from 'next';

import { redirect } from 'next/navigation';

export const metadata: Metadata = { title: 'Dashboard' };

function DashboardPage() {
  redirect('/dashboard/accounts');
}

export default DashboardPage;
