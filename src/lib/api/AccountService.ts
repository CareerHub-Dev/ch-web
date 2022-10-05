import RequestService from './RequestService';
import { localGatewayAxiosInstance } from './axios';

class AuthService {
  public readonly requestService: RequestService;

  public constructor(
    requestService: RequestService = new RequestService({ prefix: 'Account' })
  ) {
    this.requestService = requestService;
  }

  public async authenticate({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) {
    return await this.requestService.request({
      url: 'authenticate',
      method: 'POST',
      data: { email, password },
    });
  }

  public async refreshToken(refreshToken: string) {
    return await this.requestService.request({
      url: 'refresh-token',
      method: 'POST',
      data: { refreshToken },
    });
  }
}
export default AuthService;

export const authenticate = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  return new AuthService(
    new RequestService({
      axiosInstance: localGatewayAxiosInstance,
      prefix: 'auth',
    })
  ).authenticate({
    email,
    password,
  });
};

export const refreshToken = async (refreshToken: string) => {
  return new AuthService(
    new RequestService({
      axiosInstance: localGatewayAxiosInstance,
      prefix: 'auth',
    })
  ).refreshToken(refreshToken);
};
