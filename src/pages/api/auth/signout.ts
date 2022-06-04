import { NextApiRequest, NextApiResponse } from 'next';
import { deleteCookie } from '@/lib/api/local/middleware/cookieMiddleware';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    return res.status(404).json({ message: 'Метод запиту не підтримується' });
  }
  deleteCookie(res, 'ch-authority');
  res.status(200).json({ message: 'Успіх' });
};
export default handler;
