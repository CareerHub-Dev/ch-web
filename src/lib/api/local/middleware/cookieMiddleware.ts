import { serialize, CookieSerializeOptions } from 'cookie';
import { NextApiResponse } from 'next';

/**
 * Sets `cookie` using the `res` object
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

  if ('maxAge' in options) {
    options.expires = new Date(Date.now() + options.maxAge!);
    options.maxAge! /= 1000;
  }

  res.setHeader('Set-Cookie', serialize(name, stringValue, options));
};
export default setCookie;
