import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const { search } = new URL(req.url);

  const token = (await cookies()).get('token')?.value;

  if (!token) {
    return NextResponse.json('Unauthorized', { status: 401 });
  }

  try {
    const usersResponse = await fetch(
      `${process.env.BACKEND_BASE_URL}/api/users/GetAllUsers${search}&pageSize=10`,
      { headers: { Authorization: `Bearer ${token}` } },
    );

    if (!usersResponse.ok) {
      return NextResponse.json('Failed to fetch users', {
        status: usersResponse.status,
      });
    }

    const text = await usersResponse.text();

    return new NextResponse(text, { status: usersResponse.status });
  } catch {
    return NextResponse.json('Failed to connect to the server', {
      status: 500,
    });
  }
}
