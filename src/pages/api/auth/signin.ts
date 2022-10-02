import { NextApiRequest, NextApiResponse } from 'next';
import { retrieveAxiosErrorMessage, retrieveErrorMessage } from '@/lib/api';
import { authenticate } from '@/lib/api/remote/account';
import cookieMiddleware from '@/lib/api/local/middleware/cookieMiddleware';
import { AxiosError } from 'axios';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    return res.status(404).json({ message: 'Метод запиту не підтримується' });
  }

  try {
    const { email, password } = JSON.parse(req.body);
    const data = await authenticate({ email, password });
    return cookieMiddleware(res, data);
  } catch (err) {
    let message = 'Невідома помилка';
    if (err instanceof AxiosError) {
      message = retrieveAxiosErrorMessage(err);
    } else if (err instanceof Error) {
      message = retrieveErrorMessage(err);
    }
    return res.status(500).json({ message });
  }
};
export default handler;
