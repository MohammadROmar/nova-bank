import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

import { AuthFacade } from '@/core/facades/auth';

export async function POST() {
  const cookieStore = await cookies();

  const token = cookieStore.get('token')?.value;
  console.log(token);
  const refreshToken = cookieStore.get('refresh_token')?.value;

  if (!token || !refreshToken) {
    return NextResponse.json(
      { error: 'Failed to refresh token' },
      { status: 401 },
    );
  }

  try {
    const data = await AuthFacade.refreshToken(token, refreshToken);

    const res = NextResponse.json({ success: true }, { status: 200 });

    res.cookies.set({
      name: 'token',
      value: data.token,
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      path: '/',
      maxAge: 60 * 60 * 24 * 2,
    });
    res.cookies.set({
      name: 'refresh_token',
      value: data.refreshToken,
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      path: '/',
      maxAge: 60 * 60 * 24 * 2,
    });

    return res;
  } catch (e) {
    console.error(e);

    return NextResponse.json(
      { error: 'Failed to refresh token' },
      { status: 401 },
    );
  }
}
