import { NextApiRequest, NextApiResponse } from 'next';
import sessionMiddleware from '@/lib/middleware/sessionMiddleware';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'GET') {
    return res.status(404).json({ message: 'Метод запиту не підтримується' });
  }
  const session = sessionMiddleware(req.cookies);
  
  if ('error' in session) {
    return res.status(500).json({ message: session.error });
  }
  return res.status(200).json({ session });
};
export default handler;
