import { refreshToken } from '@/lib/api/account';
import cookieMiddleware from '@/lib/middleware/cookieMiddleware';
import { NextApiRequest, NextApiResponse } from 'next';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    return res.status(404).json({ message: 'Метод запиту не підтримується' });
  }

  try {
    const requestData = JSON.parse(req.body);
    const token = requestData.refreshToken as string;
    const data = await refreshToken(token);
    return cookieMiddleware(res, data);
  } catch (err) {
    let message = 'Невідома помилка';
    if (err instanceof Error) {
      message;
    }
    return res.status(500).json({ message });
  }
};
export default handler;
