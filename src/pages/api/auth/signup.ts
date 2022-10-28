import { NextApiRequest, NextApiResponse } from 'next';
import RequestStatus from '@/lib/enums/RequestStatus';
import cookieMiddleware from '@/lib/middleware/cookieMiddleware';
import UserRole from '@/lib/schemas/UserRole';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    return res.status(404).json({ message: 'Метод запиту не підтримується' });
  }

  const { email, password } = JSON.parse(req.body);

  // sendAuthRequest(email, password, UserRole.Student, false, (response: any) => {
  //   switch (response.status) {
  //     case RequestStatus.Success:
  //       cookieMiddleware(res, response);
  //       break;
  //     case RequestStatus.Error:
  //       res.status(400).json({ message: response.message });
  //       break;
  //     default:
  //       res.status(500).json({ message: 'Невідома помилка' });
  //       break;
  //   }
  // });
};
export default handler;
