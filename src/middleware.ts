import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const authCookie = req.cookies.get('ch-authority');

  if (pathname.startsWith('/my-profile')) {
    const url = req.nextUrl.clone();
    try {
      const parsedAuthCookie = JSON.parse(authCookie as string);
      url.pathname = pathname.replace(
        'my-profile',
        `student-profile/${parsedAuthCookie['accountId']}`
      );
      return NextResponse.rewrite(url);
    } catch (err) {
      url.pathname = '/auth/login';
      return NextResponse.rewrite(url);
    }
  }
  return NextResponse.next();
}
