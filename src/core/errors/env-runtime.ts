import { BaseError } from './base';

export class EnvRuntimeError extends BaseError {
  constructor() {
    super('Enviroment variables cannot be accessed on client side');
  }
}
