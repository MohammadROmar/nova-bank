import { BaseError } from './base';

export class HttpsError extends BaseError {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}
