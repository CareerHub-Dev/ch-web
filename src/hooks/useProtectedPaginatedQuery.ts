import useSession from "./useSession";
import { type AxiosInstance } from "axios";
import {
  type QueryKey,
  type UseInfiniteQueryOptions,
  useInfiniteQuery,
} from "@tanstack/react-query";
import { PaginatedResponse } from "@/lib/api/pagination";

export function useProtectedPaginatedQuery<
  TParams extends Omit<PaginatedRequestParams, "pageNumber">,
  TItem
>({
  queryKey,
  getItems,
  params,
  ...options
}: {
  queryKey: QueryKey;
  params: TParams;
  getItems: (
    instance: AxiosInstance,
    params: TParams & { pageNumber: number }
  ) => Promise<PaginatedResponse<Array<TItem>>>;
} & Omit<
  UseInfiniteQueryOptions<PaginatedResponse<Array<TItem>>>,
  "queryKey" | "queryFn" | "getNextPageParam" | "enabled"
>) {
  const { axios, status } = useSession();

  return useInfiniteQuery<
    PaginatedResponse<Array<TItem>>,
    unknown,
    PaginatedResponse<Array<TItem>>,
    QueryKey
  >(
    queryKey,
    async ({ pageParam = 1 }) =>
      getItems(axios, {
        ...params,
        pageNumber: pageParam,
      }),
    {
      enabled: status === "authenticated",
      getNextPageParam: (lastPage) => {
        if (!lastPage.pagination) {
          return undefined;
        }
        const HasNext = lastPage.pagination.HasNext;
        const CurrentPage = lastPage.pagination.CurrentPage;
        if (HasNext) {
          return CurrentPage + 1;
        }
        return undefined;
      },
      ...options,
    }
  );
}
