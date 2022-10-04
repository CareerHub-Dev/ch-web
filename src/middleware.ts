import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export const config = {
  matcher: '/my-profile',
};

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (pathname.startsWith('/my-profile')) {
    const newUrl = req.nextUrl.clone();
    try {
      const httpOnlyAuthCookie = req.cookies.get('ch-http');
      const parsedAuthCookie = JSON.parse(httpOnlyAuthCookie as string);
      newUrl.pathname = pathname.replace(
        'my-profile',
        `student-profile/${parsedAuthCookie['accountId']}`
      );
      return NextResponse.rewrite(newUrl);
    } catch (err) {
      newUrl.pathname = '/auth/login';
      return NextResponse.redirect(newUrl);
    }
  }
  return NextResponse.next();
}
