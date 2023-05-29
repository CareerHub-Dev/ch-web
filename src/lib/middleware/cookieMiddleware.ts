import { serialize, CookieSerializeOptions } from "cookie";
import SessionDataSchema from "@/lib/schemas/SessionData";

import { type NextApiResponse } from "next";
import { type ServerResponse } from "http";

type CookieItem = {
  name: string;
  value: unknown;
  options: Omit<CookieSerializeOptions, "sameSite" | "path" | "secure">;
};

function serializeCookieItem(item: CookieItem): string {
  const { name, value, options } = item;
  const cookieOptions: CookieSerializeOptions = {
    ...options,
    path: "/",
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    httpOnly: options.httpOnly ?? true,
    expires: options.expires ?? new Date(Date.now() + (options.maxAge ?? 1000)),
  };
  const stringValue =
    typeof value === "object" ? JSON.stringify(value) : String(value);
  return serialize(name, stringValue, cookieOptions);
}
/**
 * Sets multiple `cookies` using the `res` object.
 * Allows to set `maxAge` in options.
 * Some passed options will be overridden:
 * - `path` will be set to `/`
 * - `secure` will be set to `false` if not in production mode
 * - `httpOnly` will be set to `true`
 * - `sameSite` will be set to `'lax'`
 */
function setCookies(
  res: NextApiResponse | ServerResponse,
  cookies: Array<CookieItem>
) {
  const cookiesToSet = cookies.map(serializeCookieItem);
  res.setHeader("Set-Cookie", cookiesToSet);
}

/**
 * Deletes cookie that matches `name`.
 * @param res - the response object
 * @param name - the name of the cookie to delete
 */
function deleteCookie(res: NextApiResponse | ServerResponse, name: string) {
  res.setHeader(
    "Set-Cookie",
    `${name}=deleted; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`
  );
}

/**
 * Deletes the authority cookie.
 * @param res - the response object
 */
export function cleanSessionCookies(res: NextApiResponse | ServerResponse) {
  deleteCookie(res, "ch-http");
}

/**
 * Cookie middleware function.
 * If the user's role matched successfully:
 * * Sets `ch-http` cookie
 * If failed to match user's role:
 * returns 500 status code
 * @param res - the response object
 * @param backendResponse - the response object from the remote backend
 */
function cookieMiddleware(
  res: NextApiResponse | ServerResponse,
  backendResponse: unknown
) {
  const sessionData = SessionDataSchema.safeParse(backendResponse);

  if (!sessionData.success) {
    throw new Error("Unable to parse session data");
  }
  const validatedData = sessionData.data;

  setCookies(res, [
    {
      name: "ch-http",
      value: validatedData,
      options: {
        httpOnly: true,
        expires: new Date(validatedData.refreshTokenExpires),
      },
    },
  ]);

  return validatedData;
}
export default cookieMiddleware;
