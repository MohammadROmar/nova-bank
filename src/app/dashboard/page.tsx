import { Metadata } from 'next';

import PageTitle from '@/features/dashboard/components/page-title';

export const metadata: Metadata = { title: 'Dashboard' };

function DashboardPage() {
  return (
    <section>
      <PageTitle title="Dashboard" />
    </section>
  );
}

export default DashboardPage;
