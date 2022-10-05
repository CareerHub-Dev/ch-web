import { AxiosError, AxiosInstance } from 'axios';
import client, {
  type ExtendedAxiosRequestOptions,
  retrieveAxiosErrorMessage,
} from './axios';

class RequestService {
  public readonly axiosInstance: AxiosInstance;
  public readonly prefix: string;

  public constructor({
    axiosInstance = client,
    prefix = '',
  }: {
    axiosInstance?: AxiosInstance;
    prefix?: string;
  }) {
    this.axiosInstance = axiosInstance;
    this.prefix = prefix;
  }

  private static errorHandler<TData, TConfig>(err: AxiosError<TData, TConfig>) {
    const msg = retrieveAxiosErrorMessage(err);
    return Promise.reject(msg);
  }

  public async request<TData = unknown, TConfig = any, TSelected = TData>({
    select = (response) => response.data,
    ...options
  }: ExtendedAxiosRequestOptions<TData, TConfig, TSelected>) {
    options.url = `${this.prefix}/${options.url}`;
    return this.axiosInstance(options)
      .then(select)
      .catch(RequestService.errorHandler);
  }
}

export default RequestService;
