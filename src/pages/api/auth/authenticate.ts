import { NextApiRequest, NextApiResponse } from 'next';
import { authenticate } from '@/lib/api/account';
import cookieMiddleware from '@/lib/middleware/cookieMiddleware';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    return res.status(404).json({ message: 'Метод запиту не підтримується' });
  }

  try {
    const data = await authenticate(req.body);
    return cookieMiddleware(res, data);
  } catch (err) {
    let message = 'Невідома помилка';
    if (typeof err === 'string') {
      message = err;
    } else if (err instanceof Error) {
      message = err.message;
    }
    return res.status(500).json({ message });
  }
};
export default handler;
