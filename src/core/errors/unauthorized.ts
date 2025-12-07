import { BaseError } from './base';

export class UnauthorizedError extends BaseError {
  constructor(message = 'Unauthorized Access') {
    super(message);
  }
}
