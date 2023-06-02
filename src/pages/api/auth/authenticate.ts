import { authenticate } from "@/lib/api/account";
import { NextApiRequest, NextApiResponse } from "next";
import parseUnknownError from "@/lib/parse-unknown-error";
import cookieMiddleware from "@/lib/middleware/cookieMiddleware";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(404).json({ message: "Метод запиту не підтримується" });
  }

  try {
    const data = await authenticate(req.body);
    return res.status(201).json(cookieMiddleware(res, data));
  } catch (err) {
    return res.status(500).json({ message: parseUnknownError(err) });
  }
}
