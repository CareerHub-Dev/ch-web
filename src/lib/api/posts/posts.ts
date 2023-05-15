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
