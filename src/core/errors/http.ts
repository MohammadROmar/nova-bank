import { BaseError } from './base';

export class HttpError extends BaseError {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}
