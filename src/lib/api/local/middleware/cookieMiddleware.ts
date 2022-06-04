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
  options.httpOnly = true;
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
  deleteCookie(res, 'ch-authority');
};

/**
 * Cookie middleware function.
 * If the user's role matched successfully:
 * * Sets `ch-authority` cookie
 * * Sets `ch-selfId` cookie
 * * Sets `ch-entityId` cookie if user is not Admin
 * If failed to match user's role:
 * returns 500 status code
 * @param res - the response object
 * @param backendResponse - the response object from the remote backend
 */
const cookieMiddleware = (res: NextApiResponse, backendResponse: any) => {
  const matchedRole = matchUserRole(backendResponse.data.role);
  if (!matchedRole) {
    return res.status(500).json({
      message: 'Не вдалося визначити роль користувача',
    });
  }
  const authorityToken = signAuthorityToken(matchedRole);
  const cookieObj = {
    authorityToken,
    selfId: backendResponse.data.accountId,
    entityId: null,
    accessToken: backendResponse.data.jwtToken,
  };
  if ([UserRole.Company, UserRole.Student].includes(matchedRole)) {
    cookieObj.entityId = backendResponse.data[`${matchedRole}Id`];
  }
  setCookie(res, 'ch-authority', cookieObj);

  const extendedData = {
    ...backendResponse.data,
    role: matchedRole,
    sessionData: cookieObj,
  };

  res.status(201).json(extendedData);
};
export default cookieMiddleware;
