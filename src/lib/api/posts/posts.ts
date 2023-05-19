import { request } from "@/lib/axios";
import { AxiosInstance } from "axios";
import { parsePaginatedResponseAsync } from "../pagination";
import { PostArraySchema } from "./schemas";

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

export function getPostsFromAccount(
    instance: AxiosInstance,
    params: Omit<PaginatedRequestParams, "pageNumber"> & { accountId: string }
) {
    const { accountId, ...rest } = params;
    return request({
        instance,
        url: `/Student/Posts/of-account/${accountId}`,
        params: rest,
        select: parsePaginatedResponseAsync(PostArraySchema),
    });
}
