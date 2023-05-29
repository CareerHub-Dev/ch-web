import { NextApiRequest, NextApiResponse } from "next";
import { cleanSessionCookies } from "@/lib/middleware/cookieMiddleware";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    return res.status(404).json({ message: "Метод запиту не підтримується" });
  }
  cleanSessionCookies(res);
  res.status(200).json({ message: "Успіх" });
};
export default handler;
