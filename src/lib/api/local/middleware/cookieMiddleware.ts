import { serialize, CookieSerializeOptions } from 'cookie';
import { NextApiResponse } from 'next';
import UserRoleSchema from '@/lib/schemas/UserRole';
import signAuthorityToken from '../helpers/sign-authority-token';

/**
 * Sets multiple `cookies` using the `res` object.
 * Allows to set `maxAge` in options.
 * Some passed options will be overridden:
 * - `path` will be set to `/`
 * - `secure` will be set to `false` if not in production mode
 * - `httpOnly` will be set to `true`
 * - `sameSite` will be set to `'lax'`
 */
const setCookies = (
  res: NextApiResponse,
  cookies: Array<{
    name: string;
    value: unknown;
    options: Omit<CookieSerializeOptions, 'sameSite' | 'path' | 'secure'>;
  }>
) => {
  const cookiesToSet = cookies.map((cookie) => {
    const { name, value, options } = cookie;
    const cookieOptions: CookieSerializeOptions = { ...options };
    cookieOptions.secure = process.env.NODE_ENV === 'production';
    cookieOptions.path = '/';
    cookieOptions.httpOnly = options.httpOnly ?? true;
    cookieOptions.sameSite = 'lax';
    const stringValue =
      typeof value === 'object' ? JSON.stringify(value) : String(value);
    if (options.maxAge) {
      cookieOptions.expires = new Date(Date.now() + options.maxAge);
      cookieOptions.maxAge! /= 1000;
    }
    return serialize(name, stringValue, cookieOptions);
  });
  res.setHeader('Set-Cookie', cookiesToSet);
};

/**
 * Deletes cookie that matches `name`.
 * @param res - the response object
 * @param name - the name of the cookie to delete
 */
const deleteCookie = (res: NextApiResponse, name: string) => {
  res.setHeader(
    'Set-Cookie',
    `${name}=deleted; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`
  );
};

/**
 * Deletes the authority cookie.
 * @param res - the response object
 */
export const cleanSessionCookies = (res: NextApiResponse) => {
  deleteCookie(res, 'ch-http');
};

/**
 * Cookie middleware function.
 * If the user's role matched successfully:
 * * Sets `ch-http` cookie
 * If failed to match user's role:
 * returns 500 status code
 * @param res - the response object
 * @param backendResponse - the response object from the remote backend
 */
const cookieMiddleware = (
  res: NextApiResponse,
  backendResponse: RawSessionData
) => {
  const { jwtToken, refreshToken, accountId, role, jwtTokenExpires } =
    backendResponse;
  const parsedRole = UserRoleSchema.safeParse(role);

  if (!parsedRole.success) {
    return res.status(500).json({
      message: 'Не вдалося визначити роль користувача',
    });
  }
  const matchedRole = parsedRole.data;
  const authorityToken = signAuthorityToken(matchedRole);
  const httpCookie = {
    accountId,
    authorityToken,
    accessToken: jwtToken,
  };
  const clientCookie = {
    accountId,
    role: matchedRole,
    refreshToken,
    accessToken: jwtToken,
    accessExpires: jwtTokenExpires,
  };

  setCookies(res, [
    {
      name: 'ch-http',
      value: httpCookie,
      options: {
        httpOnly: true,
      },
    },
    {
      name: 'ch-client',
      value: clientCookie,
      options: {
        httpOnly: false,
      },
    },
  ]);

  const extendedData = {
    httpCookie,
    clientCookie,
  };

  return res.status(201).json(extendedData);
};
export default cookieMiddleware;
