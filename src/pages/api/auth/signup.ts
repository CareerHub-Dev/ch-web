import { NextApiRequest, NextApiResponse } from 'next';
import { sendAuthRequest } from '@/lib/api/remote/auth';
import RequestStatus from '@/model/enums/RequestStatus';
import setCookie from '@/lib/api/local/middleware/cookieMiddleware';
import signAuthorityToken from '@/lib/api/local/helpers/sign-authority-token';
import matchUserRole from '@/lib/api/local/helpers/match-user-role';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    return res.status(404).json({ message: 'Метод запиту не підтримується' });
  }

  const { email, password } = JSON.parse(req.body);

  sendAuthRequest(email, password, true, (response) => {
    switch (response.status) {
      case RequestStatus.Success:
        const matchedRole = matchUserRole(response.data.role);
        if (!matchedRole) {
          return res.status(500).json({
            message: 'Не вдалося визначити роль користувача',
          });
        }
        const authorityToken = signAuthorityToken(matchedRole);
        setCookie(res, 'ch-authority', authorityToken);

        const extendedData = {
          ...response.data,
          role: matchedRole,
          authorityToken,
        };
        console.log(extendedData);

        res.status(201).json(extendedData);
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
