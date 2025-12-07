import { EnvRuntimeError } from '../errors/env-runtime';
import { HttpsError } from '../errors/http';
import { ServerError } from '../errors/server';
import { UnauthorizedError } from '../errors/unauthorized';

export class ApiClient {
  static #instance: ApiClient;
  #baseUrl: string;

  private constructor() {
    this.#baseUrl = process.env.BACKEND_BASE_URL ?? '';

    if (!this.#baseUrl) {
      throw new EnvRuntimeError();
    }
  }

  public static get instance(): ApiClient {
    if (!ApiClient.#instance) {
      ApiClient.#instance = new ApiClient();
    }
    return ApiClient.#instance;
  }

  public async request<T>(
    endpoint: string,
    options: RequestInit = {},
  ): Promise<T> {
    try {
      const response = await fetch(`${this.#baseUrl}${endpoint}`, options);

      if (response.status === 401) {
        throw new UnauthorizedError();
      } else if (!response.ok) {
        throw new HttpsError('Failed to fetch data', response.status);
      }

      return await response.json();
    } catch {
      throw new ServerError();
    }
  }
}
