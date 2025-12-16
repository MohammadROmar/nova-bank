import type { PropsWithChildren } from 'react';

import PageTitle from '@/features/dashboard/components/page-title';
import TransactionHeader from '@/features/transactions/components/transaction-header';

function TransactionsLayout({ children }: PropsWithChildren) {
  return (
    <section>
      <div>
        <PageTitle title="Transaction Managemant" />
      </div>

      <div className="mt-8 rounded-2xl border border-gray-200 bg-white shadow">
        <TransactionHeader />
        <div className="p-4">{children}</div>
      </div>
    </section>
  );
}

export default TransactionsLayout;
