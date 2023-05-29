import useSession from "./useSession";
import {
  useQuery,
  type UseQueryOptions,
  type QueryKey,
} from "@tanstack/react-query";
import { type AxiosInstance } from "axios";

export function useProtectedQuery<
  TQueryKey extends QueryKey = QueryKey,
  TQueryFnData = unknown,
  TError = unknown,
  TData = TQueryFnData
>(
  queryKey: TQueryKey,
  queryFn: (instance: AxiosInstance) => Promise<TQueryFnData>,
  options?: Omit<
    UseQueryOptions<TQueryFnData, TError, TData, TQueryKey>,
    "queryFn" | "queryKey"
  >
) {
  const { axios, status } = useSession();
  const isAuthenticated = status === "authenticated";
  const enabled = !!options?.enabled
    ? isAuthenticated && options.enabled
    : isAuthenticated;

  return useQuery<TQueryFnData, TError, TData, TQueryKey>({
    ...options,
    queryKey,
    enabled,
    queryFn: () => queryFn(axios),
  });
}
