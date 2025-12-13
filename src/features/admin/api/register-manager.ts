'use server';

import { HttpError } from '@/core/errors/http';
import { ValidationError } from '@/core/errors/validation';
import { buildRegisterManagerChain } from '@/core/chain/register-manager';

type RegisterManagerInputs = {
  userName: string;
  email: string;
  password: string;
  phoneNumber: string;
};
type RegisterManagerActionState = {
  id?: string;
  values?: RegisterManagerInputs;
} & ({ success?: true } | { success?: false; error?: string });

export async function registerManagerAction(
  prevState: RegisterManagerActionState,
  formData: FormData,
): Promise<RegisterManagerActionState> {
  const userName = formData.get('username')?.toString() || '';
  const email = formData.get('email')?.toString() || '';
  const password = formData.get('password')?.toString() || '';
  const phoneNumber = formData.get('phoneNumber')?.toString() || '';

  const managerCredentials = {
    userName,
    email,
    password,
    phoneNumber,
  };

  const chain = buildRegisterManagerChain();

  try {
    await chain.handle(managerCredentials);
    return {
      id: Date.now().toString(),
      success: true,
    };
  } catch (err) {
    let error =
      'Unexpected error has occurred. Please check your input or try agin later';

    if (err instanceof ValidationError) {
      error = err.message;
    } else if (err instanceof HttpError) {
      error = 'Failed to register manager';
    }

    return {
      id: prevState.id,
      success: false,
      error,
      values: managerCredentials,
    };
  }
}
