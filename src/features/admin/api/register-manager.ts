'use server';

import { HttpError } from '@/core/errors/http';
import { ValidationError } from '@/core/errors/validation';
import { buildRegisterManagerChain } from '@/core/chain/register-manager';

type RegisterManagerInputs = {
  username: string;
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
  const username = formData.get('username')?.toString() || '';
  const email = formData.get('email')?.toString() || '';
  const password = formData.get('password')?.toString() || '';
  const phoneNumber = formData.get('phone')?.toString() || '';

  const managerCredentials = { username, email, password, phoneNumber };

  const chain = buildRegisterManagerChain();

  try {
    await chain.handle(managerCredentials);
    return {
      id: Date.now().toString(),
      success: true,
      values: managerCredentials,
    };
  } catch (err) {
    let errorMessage =
      'Unexpected error has occurred. Please check your input or try agin later';

    if (err instanceof ValidationError) {
      errorMessage = err.message;
    } else if (err instanceof HttpError) {
      errorMessage = 'Failed to register manager';
    }

    return {
      id: prevState.id,
      success: false,
      error: errorMessage,
      values: managerCredentials,
    };
  }
}
