import { Transaction } from './transaction';

export type ActionState = { id?: string } & (
  | { success?: true; transaction?: Transaction }
  | { success?: false; error?: string }
);
