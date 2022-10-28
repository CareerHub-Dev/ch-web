import { serialize, CookieSerializeOptions } from 'cookie';
import { NextApiResponse } from 'next';
import SessionDataSchema from '@/lib/schemas/SessionData';

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
    const cookieOptions: CookieSerializeOptions = { ...options,
      path: '/',
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      httpOnly: options.httpOnly ?? true,
      expires: options.expires ?? new Date(Date.now() + (options.maxAge ?? 1000)),
    };
    const stringValue =
      typeof value === 'object' ? JSON.stringify(value) : String(value);
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
const cookieMiddleware = (res: NextApiResponse, backendResponse: unknown) => {
  const sessionData = SessionDataSchema.safeParse(backendResponse);

  if (!sessionData.success) {
    return res.status(500).json({
      message: 'Неочікувана відповідь від сервера',
    });
  }
  const validatedData = sessionData.data;

  setCookies(res, [
    {
      name: 'ch-http',
      value: validatedData,
      options: {
        httpOnly: true,
        expires: new Date(validatedData.refreshTokenExpires),
      },
    },
  ]);

  return res.status(201).json(validatedData);
};
export default cookieMiddleware;
