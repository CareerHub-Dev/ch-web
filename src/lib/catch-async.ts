import { NextApiResponse } from "next";

export default function catchAsync<T>(fn: ExtendedApiHandler<T>) {
  return async function (
    req: NextApiRequestWithSessionData,
    res: NextApiResponse
  ) {
    try {
      const handlerResult = fn(req, res);
      if (handlerResult instanceof Promise) {
        return await handlerResult;
      }
      return handlerResult;
    } catch (e: unknown) {
      let message = "Something went wrong! Error: ";
      if (e instanceof Error) {
        message += e.message;
      } else {
        message += "unknown. Caught object: " + e;
      }
      return res.status(500).json({ message });
    }
  };
}
