'use client';

import { createContext, useContext, type PropsWithChildren } from 'react';

import { User } from '@/features/auth/models/user';

type UserRoleState = { role: User['role'] };
type UserRoleStateValue = UserRoleState;
type UserRoleContextProvider = UserRoleState & PropsWithChildren;

const UserRoleContext = createContext<UserRoleStateValue | null>(null);

export default function UserRoleContextProvider({
  role,
  children,
}: UserRoleContextProvider) {
  return (
    <UserRoleContext.Provider value={{ role }}>
      {children}
    </UserRoleContext.Provider>
  );
}

export function useUserRoleContext() {
  const userRoleContext = useContext(UserRoleContext);

  if (userRoleContext === null) {
    throw new Error('User role context is null');
  }

  return userRoleContext;
}
