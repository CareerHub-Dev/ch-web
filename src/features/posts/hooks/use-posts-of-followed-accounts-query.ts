import { parsePaginatedResponseAsync } from "@/lib/api/pagination";
import { request } from "@/lib/axios";
import { AxiosInstance } from "axios";
import { PostArraySchema } from "./use-self-posts-query";
import { useProtectedPaginatedQuery } from "@/hooks/useProtectedPaginatedQuery";

export function getPostsFromFollowedAccounts(
  instance: AxiosInstance,
  params: Omit<PaginatedRequestParams, "pageNumber">
) {
  return request({
    instance,
    url: `/Student/Posts/followed-accounts`,
    params,
    select: parsePaginatedResponseAsync(PostArraySchema),
  });
}

export function usePostsOfFollowedAccountsQuery() {
  return useProtectedPaginatedQuery({
    queryKey: ["posts-of-followed-accounts"],
    getItems: getPostsFromFollowedAccounts,
    params: {
      pageSize: 36,
    },
  });
}
