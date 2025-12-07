import { BaseError } from './base';

export class ValidationError extends BaseError {
  constructor(message = 'Invalid data provided') {
    super(message);
  }
}
