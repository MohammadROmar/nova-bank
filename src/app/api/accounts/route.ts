import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const { search } = new URL(req.url);

  const token = (await cookies()).get('token')?.value;

  if (!token) {
    return NextResponse.json('Unauthorized', { status: 401 });
  }

  try {
    const response = await fetch(
      `${process.env.BACKEND_BASE_URL}/api/Accounts${search}&pageSize=10`,
      { headers: { Authorization: `Bearer ${token}` } },
    );

    if (!response.ok) {
      return NextResponse.json('Failed to fetch accounts', {
        status: response.status,
      });
    }

    const text = await response.text();

    return new NextResponse(text, { status: response.status });
  } catch {
    return NextResponse.json('Failed to connect to the server', {
      status: 500,
    });
  }
}
