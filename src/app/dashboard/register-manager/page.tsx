import { Metadata } from 'next';

import RegisterManagerPageContent from '@/features/admin/components/register-manager-page-content';

export const metadata: Metadata = { title: 'Register Manager' };

function RegisterManagerPage() {
  return <RegisterManagerPageContent />;
}

export default RegisterManagerPage;
