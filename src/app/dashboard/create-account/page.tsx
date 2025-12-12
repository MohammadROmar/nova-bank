import { Metadata } from 'next';

import PageTitle from '@/features/dashboard/components/page-title';
import CreateNewAccount from '@/features/accounts/components/creat-new-account';

export const metadata: Metadata = {
  title: 'Create New Account',
};

export default function CreateAccountPage() {
  return (
    <section className="h-full space-y-8">
      <div>
        <PageTitle title="Create New Account" />
      </div>

      <CreateNewAccount />
    </section>
  );
}
