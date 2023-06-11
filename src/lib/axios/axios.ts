import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
} from "axios";
import { Agent } from "https";
import { backendApiBaseUrl, localGatewayUrl } from "../api";
import { convertParams } from "./convert-params";

const defaultHeaders = { "Content-Type": "application/json" };

const httpsAgent = new Agent({
  rejectUnauthorized: false,
});

export const localGatewayAxiosInstance = axios.create({
  baseURL: localGatewayUrl,
  headers: defaultHeaders,
  httpsAgent,
});

const axiosInstance = axios.create({
  baseURL: backendApiBaseUrl,
  headers: defaultHeaders,
  httpsAgent,
});
export default axiosInstance;

function retrieveAxiosErrorMessage(err: AxiosError<unknown>): string {
  const data = err.response?.data;

  if (!!data && typeof data === "object") {
    if ("detail" in data && !!data.detail && typeof data.detail === "string") {
      return data.detail;
    }

    if (
      "message" in data &&
      !!data.message &&
      typeof data.message === "string"
    ) {
      return data.message;
    }
  }

  if (!!err.message) {
    return err.message;
  }

  return "Невідома помилка запиту";
}

function requestErrorHandler(err: unknown) {
  let msg = "Невідома помилка запиту";
  if (err instanceof AxiosError) {
    msg = retrieveAxiosErrorMessage(err);
  } else if (err instanceof Error) {
    msg = err.message;
  }
  return Promise.reject(msg);
}

export async function request<TSelected = any>(
  options: ExtendedAxiosRequestOptions<Promise<TSelected>>
): Promise<TSelected>;
export async function request<TSelected = any>(
  options: ExtendedAxiosRequestOptions<TSelected>
): Promise<TSelected>;
export async function request<TSelected = any>({
  instance = axiosInstance,
  prefix,
  select = (response) => response.data,
  method = "GET",
  ...options
}: ExtendedAxiosRequestOptions<
  TSelected | Promise<TSelected>
>): Promise<TSelected> {
  if (prefix) {
    options.url = `${prefix}/${options.url}`;
  }
  if (options.params) {
    options.params = convertParams(options.params);
  }

  return instance({ method, ...options })
    .then(select)
    .catch(requestErrorHandler);
}

function defaultSelector(response: AxiosResponse): any {
  return response.data;
}

export class ApiRequestConfig<TSelected = any> {
  public readonly options: AxiosRequestConfig;
  public readonly selector: AxiosResponseCallbackFn<TSelected>;

  public constructor(
    options: ExtendedAxiosRequestOptions<TSelected | Promise<TSelected>>,
    selector: AxiosResponseCallbackFn<TSelected> = defaultSelector
  ) {
    this.options = options;
    this.selector = selector;
  }

  public static copyFrom<TSelectedFromAnother>(
    another: ApiRequestConfig<TSelectedFromAnother>
  ): ApiRequestConfig<TSelectedFromAnother> {
    return new ApiRequestConfig<TSelectedFromAnother>(
      { ...another.options },
      another.selector
    );
  }

  public withReplacedUrlParts(
    replacement: Record<string, string>
  ): ApiRequestConfig<TSelected> {
    const newConfig = ApiRequestConfig.copyFrom(this);

    if (newConfig.options.url !== undefined) {
      for (const [key, value] of Object.entries(replacement)) {
        newConfig.options.url = newConfig.options.url.replace(
          key,
          encodeURIComponent(value)
        );
      }
    }
    return newConfig;
  }

  public withParams<TParams extends object>(
    params: TParams
  ): ApiRequestConfig<TSelected> {
    const newConfig = ApiRequestConfig.copyFrom(this);
    newConfig.options.params = params;
    return newConfig;
  }
}

export class ApiRequest<TSelected, TVariables = void> {
  public readonly axiosInstance: AxiosInstance;
  public readonly requestConfig: ApiRequestConfig<TSelected>;

  public constructor(
    axiosInstance: AxiosInstance,
    requestConfig: ApiRequestConfig<TSelected>
  ) {
    this.axiosInstance = axiosInstance;
    this.requestConfig = requestConfig;
  }

  public async call(variables: TVariables): Promise<TSelected> {
    let options = this.requestConfig.options;
    if (variables) {
      options = { ...options, params: variables };
    }
    return this.axiosInstance(options)
      .then(this.requestConfig.selector)
      .catch(requestErrorHandler);
  }
}
