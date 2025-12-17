import { ApiClient } from '../api/api-client';
import { Transaction } from '@/features/transactions/models/transaction';

export class TransactionsFacade {
  static #api = ApiClient.instance;

  public static async deposit(
    accountId: number,
    amount: number,
    token: string,
  ) {
    return this.#api.request<Transaction>(
      `/api/Transactions/${accountId}/Deposit`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ amount }),
      },
    );
  }
  public static async withdraw(
    accountId: number,
    amount: number,
    token: string,
  ) {
    return this.#api.request<Transaction>(
      `/api/Transactions/${accountId}/Withdraw`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ amount }),
      },
    );
  }
  public static async transfer(
    fromAccount: number,
    toAccountId: number,
    amount: number,
    token: string,
  ) {
    return this.#api.request<Transaction>(
      `/api/Transactions/${fromAccount}/Transfer`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ amount, toAccountId }),
      },
    );
  }
}
