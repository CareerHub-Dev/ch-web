import { parsePaginatedResponseAsync } from "@/lib/api/pagination";
import { request } from "@/lib/axios";
import { AxiosInstance } from "axios";
import { PostArraySchema } from "./use-self-posts-query";
import { useProtectedPaginatedQuery } from "@/hooks/useProtectedPaginatedQuery";

export function getPostsFromAccount(
  instance: AxiosInstance,
  {
    accountId,
    ...params
  }: Omit<PaginatedRequestParams, "pageNumber"> & { accountId: string }
) {
  return request({
    instance,
    url: `/Student/Posts/of-account/${accountId}`,
    params,
    select: parsePaginatedResponseAsync(PostArraySchema),
  });
}

export function usePostsOfAccountQuery(accountId: string) {
  return useProtectedPaginatedQuery({
    queryKey: ["posts-of-account", accountId],
    getItems: getPostsFromAccount,
    params: {
      pageSize: 36,
      accountId,
    },
  });
}
