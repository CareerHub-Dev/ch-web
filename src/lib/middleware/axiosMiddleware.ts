import createAxiosInstance from '../axios/create-instance';
import refreshTokenMiddleware from './refreshTokenMiddleware';

export default function axiosMiddleware(
  context: GetServerSidePropsContextWithSession
) {
  return createAxiosInstance({
    data: context.session,
    refreshToken: () =>
      refreshTokenMiddleware({
        token: context.session.refreshToken,
        response: context.res,
      }),
  });
}
