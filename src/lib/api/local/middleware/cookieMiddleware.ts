import UserRole from '@/models/enums/UserRole';
import { serialize, CookieSerializeOptions } from 'cookie';
import { NextApiResponse } from 'next';
import matchUserRole from '../helpers/match-user-role';
import signAuthorityToken from '../helpers/sign-authority-token';

/**
 * Sets `cookie` using the `res` object.
 * Allows to set `maxAge` in options.
 * Some passed options will be overridden:
 * - `path` will be set to `/`
 * - `secure` will be set to `false` if not in production mode
 * - `httpOnly` will be set to `true`
 * - `sameSite` will be set to `'lax'`
 */
const setCookie = (
  res: NextApiResponse,
  name: string,
  value: unknown,
  options: CookieSerializeOptions = {}
) => {
  const stringValue =
    typeof value === 'object' ? JSON.stringify(value) : String(value);

  options.secure = process.env.NODE_ENV === 'production';
  options.httpOnly = options.httpOnly ?? true;
  options.sameSite = 'lax';
  options.path = '/';

  if ('maxAge' in options) {
    options.expires = new Date(Date.now() + options.maxAge!);
    options.maxAge! /= 1000;
  }
  res.setHeader('Set-Cookie', serialize(name, stringValue, options));
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
const cookieMiddleware = (res: NextApiResponse, backendResponse: any) => {
  const { jwtToken, refreshToken, accountId, role, jwtTokenExpires } =
    backendResponse;
  const matchedRole = matchUserRole(role);

  if (!matchedRole) {
    return res.status(500).json({
      message: 'Не вдалося визначити роль користувача',
    });
  }
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
  setCookie(res, 'ch-http', httpCookie);

  const extendedData = {
    httpCookie,
    clientCookie,
  };

  return res.status(201).json(extendedData);
};
export default cookieMiddleware;
