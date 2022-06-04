import { serialize, CookieSerializeOptions } from 'cookie';
import { NextApiResponse } from 'next';

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
    typeof value === 'object' ? 'j:' + JSON.stringify(value) : String(value);

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
export default setCookie;

export const deleteCookie = (res: NextApiResponse, name: string) => {
  res.setHeader(
    'Set-Cookie',
    `${name}=deleted; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`
  );
};
