import { NextResponse } from "next/server";
import { NextRequest, NextFetchEvent } from "next/server";
import { parseSessionFromNextCookies } from "./lib/middleware/sessionMiddleware";

export async function middleware(req: NextRequest, _event: NextFetchEvent) {
    const { pathname } = req.nextUrl;

    if (pathname.startsWith("/me")) {
        const newUrl = req.nextUrl.clone();

        try {
            const session = parseSessionFromNextCookies(req.cookies);
            let newUrl = new URL(req.url);

            if (session.role === "Student") {
                newUrl = new URL(
                    req.url.replace("me", `students/${session.accountId}`)
                );
            } else {
                newUrl = new URL(req.url.replace("me", "company-dashboard"));
            }
            return NextResponse.rewrite(newUrl);
        } catch (err) {
            req.cookies.set("ch-http", "", {
                httpOnly: true,
                path: "/",
                sameSite: "lax",
                secure: true,
            });
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
