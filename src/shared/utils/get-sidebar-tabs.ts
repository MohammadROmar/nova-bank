import dashboard from '@/assets/icons/dashboard';
import addUser from '@/assets/icons/add-user';
import { User } from '@/features/auth/models/user';

export function getSidebarTabs(role: User['role']) {
  const dashboardTabs = [
    { label: 'Dashboard', href: '/dashboard', icon: dashboard },
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
