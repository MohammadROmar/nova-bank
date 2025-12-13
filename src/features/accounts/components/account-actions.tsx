import Link from 'next/link';

function AccountActions({ id }: { id: string }) {
  return (
    <section className="space-y-2 rounded-2xl border border-gray-200 bg-white p-4 shadow lg:col-span-2">
      <h3 className="text-xl font-semibold">Actions</h3>
      <h4 className="mt-4 text-xs text-gray-600">ACCOUNT</h4>
      <Link
        href={`/dashboard/accounts/${id}/update`}
        className="button flex items-center justify-center"
      >
        Update Account
      </Link>
      <div>
        <label></label>
      </div>
      <h4 className="mt-4 text-xs text-gray-600">TRANSACTIONS</h4>
    </section>
  );
}

export default AccountActions;
