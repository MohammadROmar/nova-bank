import { cookies } from 'next/headers';

import { ApiClient } from '@/core/api/api-client';
import { Account } from '../models/accounts';

export async function getAccount(id: string) {
  const api = ApiClient.instance;
  const token = (await cookies()).get('token')?.value;

  const account = await api.request<Account>(`/api/Accounts/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return account;
}
