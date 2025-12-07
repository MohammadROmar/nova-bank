'use client';

import { notFound } from 'next/navigation';

import { useUserRoleContext } from '@/shared/store/role';
import PageTitle from '@/features/dashboard/components/page-title';
import RegisterManagerForm from '@/features/admin/components/register-manager-form';

function RegisterManagerPageContent() {
  const { role } = useUserRoleContext();

  if (role !== 'Administrator') {
    return notFound();
  }

  return (
    <section className="grid grid-rows-[auto_auto_1fr]">
      <PageTitle title="Register Manager" />
      <RegisterManagerForm />
    </section>
  );
}

export default RegisterManagerPageContent;
