import dashboard from '@/assets/icons/dashboard';
import addUser from '@/assets/icons/add-user';
import wallet from '@/assets/icons/wallet';
import addWallet from '@/assets/icons/add-wallet';
import { User } from '@/features/auth/models/user';

export function getSidebarTabs(role: User['role']) {
  const dashboardTabs = [
    { label: 'Dashboard', href: '/dashboard', icon: dashboard },
    { label: 'Accounts', href: '/dashboard/accounts', icon: wallet },
    {
      label: 'Create Account',
      href: '/dashboard/create-account',
      icon: addWallet,
    },
  ];

  const adminTabs = [
    ...dashboardTabs,
    {
      label: 'Register Manager',
      href: '/dashboard/register-manager',
      icon: addUser,
    },
  ];

  return role === 'Administrator' ? adminTabs : dashboardTabs;
}
