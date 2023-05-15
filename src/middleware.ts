import { NextResponse } from "next/server";
import type { NextRequest, NextFetchEvent } from "next/server";

export async function middleware(req: NextRequest, _event: NextFetchEvent) {
    const { pathname } = req.nextUrl;

    if (pathname.startsWith("/me")) {
        const newUrl = req.nextUrl.clone();

        try {
            const httpOnlyAuthCookie = req.cookies.get("ch-http");
            const parsedAuthCookie = JSON.parse(httpOnlyAuthCookie as string);
            const newUrl = new URL(
                req.url.replace(
                    "me",
                    `students/${parsedAuthCookie["accountId"]}`
                )
            );
            return NextResponse.rewrite(newUrl);
        } catch (err) {
            newUrl.pathname = "/auth/login";
            newUrl.search = "";
            return NextResponse.redirect(newUrl);
        }
    }
    return NextResponse.next();
}

export const config = {
    matcher: ["/me", "/me/edit"],
};
