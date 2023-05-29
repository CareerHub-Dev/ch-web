import useSession from "@/hooks/useSession";
import {
  useQuery,
  type UseQueryOptions,
  type QueryKey,
} from "@tanstack/react-query";
import { ApiRequest, ApiRequestConfig } from "@/lib/axios";

export function useApiRequestQuery<
  TQueryKey extends QueryKey = QueryKey,
  TQueryData = unknown,
  TError = unknown,
  TData = TQueryData
>(
  queryKey: TQueryKey,
  apiRequestConfig: ApiRequestConfig<TQueryData>,
  options?: Omit<
    UseQueryOptions<TQueryData, TError, TData, TQueryKey>,
    "queryFn" | "queryKey"
  >
) {
  const { axios, status } = useSession();
  const isAuthenticated = status === "authenticated";

  let enabled = isAuthenticated;

  if (options?.enabled !== undefined) {
    enabled = options.enabled && enabled;
  }

  const request = new ApiRequest(axios, apiRequestConfig);

  return useQuery<TQueryData, TError, TData, TQueryKey>(
    queryKey,
    () => request.call(),
    {
      ...options,
      enabled,
    }
  );
}
