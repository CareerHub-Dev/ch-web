import { NextApiRequest, NextApiResponse } from 'next';
import { sendAuthRequest } from '@/lib/api/remote/auth';
import RequestStatus from '@/models/enums/RequestStatus';
import cookieMiddleware from '@/lib/api/local/middleware/cookieMiddleware';
import UserRole from '@/models/enums/UserRole';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    return res.status(404).json({ message: 'Метод запиту не підтримується' });
  }

  const { email, password } = JSON.parse(req.body);

  sendAuthRequest(email, password, UserRole.Student, false, (response: any) => {
    switch (response.status) {
      case RequestStatus.Success:
        cookieMiddleware(res, response);
        break;
      case RequestStatus.Error:
        res.status(400).json({ message: response.message });
        break;
      default:
        res.status(500).json({ message: 'Невідома помилка' });
        break;
    }
  });
};
export default handler;
