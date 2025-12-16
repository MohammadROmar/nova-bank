import { ApiClient } from '../api/api-client';

export class TransactionsFacade {
  static #api = ApiClient.instance;

  public static async deposit(
    amount: number,
    accountId: number,
    token: string,
  ) {
    return this.#api.request(`/api/Transactions/${accountId}/Deposit`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ amount }),
    });
  }
  public static async withdraw(
    amount: number,
    accountId: number,
    token: string,
  ) {
    return this.#api.request(`/api/Transactions/${accountId}/Withdraw`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ amount }),
    });
  }
  public static async transfer(
    amount: number,
    fromAccount: number,
    toAccount: number,
    token: string,
  ) {}
}
