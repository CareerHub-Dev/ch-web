import catchAsync from './catch-async';
import type { NextApiResponse } from 'next/types';

type MethodParams<T> = {
  handler: ExtendedApiHandler<T>;
  protect?: boolean | Array<string>;
};

export function makeHandler<
  TGetResponse = any,
  TPostResponse = any,
  TPutResponse = any,
  TPatchResponse = any,
  TDeleteResponse = any
>(options: {
  GET?: MethodParams<TGetResponse>;
  POST?: MethodParams<TPostResponse>;
  PUT?: MethodParams<TPutResponse>;
  PATCH?: MethodParams<TPatchResponse>;
  DELETE?: MethodParams<TDeleteResponse>;
}) {
  return catchAsync(
    async (req: NextApiRequestWithSessionData, res: NextApiResponse) => {
      const { method } = req;
      const methodAllowed =
        !!method &&
        method in options &&
        !!options[method as keyof typeof options];

      if (!methodAllowed) {
        res.status(405).json({ message: 'Method not allowed' });
        return;
      }

      const methodParams = options[method as keyof typeof options]!;
      if (methodParams.protect) {
        // const session = await getSession({ req });

        // if (!session) {
        //   res.status(401).json({ message: 'Unauthorized' });
        //   return;
        // }

        // if (!!methodParams.protect) {
        //   if (!session.user) {
        //     res.status(403).json({ message: 'Forbidden' });
        //     return;
        //   }
        //   if (typeof methodParams.protect !== 'boolean') {
        //     const { role } = session.user;
        //     if (!methodParams.protect.includes(role)) {
        //       res.status(403).json({ message: 'Forbidden' });
        //       return;
        //     }
        //   }
        // }
        req.user = undefined;
      }

      return await methodParams.handler(req, res);
    }
  );
}
