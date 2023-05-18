import refreshTokenMiddleware from "@/lib/middleware/refreshTokenMiddleware";

import { type NextApiRequest, type NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method !== "POST") {
        return res
            .status(404)
            .json({ message: "Метод запиту не підтримується" });
    }

    try {
        const token = req.body.refreshToken as string;
        const data = await refreshTokenMiddleware({ token, response: res });
        return res.status(201).json(data);
    } catch (err) {
        let message = "Невідома помилка";
        if (err instanceof Error) {
            message = err.message;
        }
        return res.status(500).json({ message });
    }
};
export default handler;
