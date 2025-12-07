import { BaseError } from './base';

export class ServerError extends BaseError {
  constructor(message = 'Internal server errors') {
    super(message);
  }
}
