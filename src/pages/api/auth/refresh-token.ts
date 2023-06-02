import refreshTokenMiddleware from "@/lib/middleware/refreshTokenMiddleware";
import parseUnknownError from "@/lib/parse-unknown-error";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(404).json({ message: "Метод запиту не підтримується" });
  }

  try {
    const token = req.body.refreshToken as string;
    const data = await refreshTokenMiddleware({ token, response: res });
    return res.status(201).json(data);
  } catch (err) {
    return res.status(500).json({ message: parseUnknownError(err) });
  }
}
