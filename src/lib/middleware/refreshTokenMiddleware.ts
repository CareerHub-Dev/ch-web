import { refreshToken } from "../api/account";
import cookieMiddleware from "../middleware/cookieMiddleware";

import { type NextApiResponse } from "next";
import { type ServerResponse } from "http";

export default async function refreshTokenMiddleware({
  token,
  response,
}: {
  token: string;
  response: NextApiResponse | ServerResponse;
}) {
  const data = await refreshToken(token);
  return cookieMiddleware(response, data);
}
