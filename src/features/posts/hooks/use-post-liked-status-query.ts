import { z } from "zod";
import { useProtectedQuery } from "@/hooks/useProtectedQuery";
import { request } from "@/lib/axios";
import { AxiosInstance } from "axios";
import useToast from "@/hooks/useToast";
import { InfiniteData, useQueryClient } from "@tanstack/react-query";
import useProtectedMutation from "@/hooks/useProtectedMutation";
import { PaginatedResponse } from "@/lib/api/pagination";
import { Post } from "./use-self-posts-query";

function changePostLikesAmountInCache(
  postId: string,
  data: unknown,
  type: "increase" | "decrease"
) {
  try {
    let newData = structuredClone(data) as InfiniteData<
      PaginatedResponse<Post[]>
    >;

    const page = newData.pages.find((page) =>
      page.data.some((post) => post.id === postId)
    );
    const post = page?.data.find((post) => post.id === postId);
    if (type === "increase") {
      ++post!.likes;
      post!.isLiked = true;
    } else {
      --post!.likes;
      post!.isLiked = false;
    }

    return newData;
  } catch (_error) {
    return data;
  }
}

export function getPostLikedStatus(postId: string) {
  return (instance: AxiosInstance) => {
    return request({
      instance,
      url: `/Student/Posts/${postId}/liked`,
      select: (response) => z.boolean().parse(response.data),
    });
  };
}

export function likePost(instance: AxiosInstance) {
  return (postId: string) => {
    return request({
      instance,
      url: `/Student/Posts/${postId}/like`,
      method: "POST",
    });
  };
}

export function unlikePost(instance: AxiosInstance) {
  return (postId: string) => {
    return request({
      instance,
      url: `/Student/Posts/${postId}/unlike`,
      method: "DELETE",
    });
  };
}

export function usePostLikedStatusQuery({
  postId,
  initialValue,
}: {
  postId: string;
  initialValue: boolean;
}) {
  return useProtectedQuery(
    ["post", postId, "liked"],
    getPostLikedStatus(postId),
    { initialData: initialValue }
  );
}

export function usePostLikedStatusMutation({
  postId,
  initialValue,
  account,
}: {
  postId: string;
  initialValue: boolean;
  account: Post["account"];
}) {
  const postLikedStatusQueryKey = ["post", postId, "liked"];
  const postOfFollowedAccountsQueryKey = ["posts-of-followed-accounts"];
  const postsOfAccountQueryKey = ["posts-of-account", account.id];

  const toast = useToast();
  const queryClient = useQueryClient();
  const { data: isLikedQueryData } = usePostLikedStatusQuery({
    postId,
    initialValue,
  });
  const isLiked =
    isLikedQueryData === undefined ? initialValue : isLikedQueryData;

  const mutation = useProtectedMutation(
    ["change-post-is-liked", postId],
    isLiked ? unlikePost : likePost,
    {
      onMutate: async () => {
        await queryClient.cancelQueries({ queryKey: postLikedStatusQueryKey });
        await queryClient.cancelQueries({ queryKey: postsOfAccountQueryKey });
        await queryClient.cancelQueries({
          queryKey: postOfFollowedAccountsQueryKey,
        });

        const cachedStatus = queryClient.getQueryData(
          postLikedStatusQueryKey
        ) as boolean | undefined;
        const cachedAmountInPostsFromFollowedAccounts =
          queryClient.getQueryData(postOfFollowedAccountsQueryKey);
        const cachedPostsFromAccount = queryClient.getQueryData(
          postsOfAccountQueryKey
        );

        const newStatus = !cachedStatus;
        const newAmountInPostsFromFollowedAccounts =
          changePostLikesAmountInCache(
            postId,
            cachedAmountInPostsFromFollowedAccounts,
            newStatus ? "increase" : "decrease"
          );
        const newPostsFromAccount = changePostLikesAmountInCache(
          postId,
          cachedPostsFromAccount,
          newStatus ? "increase" : "decrease"
        );

        queryClient.setQueryData(postLikedStatusQueryKey, newStatus);
        queryClient.setQueryData(
          postOfFollowedAccountsQueryKey,
          newAmountInPostsFromFollowedAccounts
        );
        queryClient.setQueryData(postsOfAccountQueryKey, newPostsFromAccount);

        return () => {
          queryClient.setQueryData(postLikedStatusQueryKey, cachedStatus);
          queryClient.setQueryData(
            postOfFollowedAccountsQueryKey,
            cachedAmountInPostsFromFollowedAccounts
          );
          queryClient.setQueryData(
            postsOfAccountQueryKey,
            cachedPostsFromAccount
          );
        };
      },
      onSettled: () => {
        queryClient.invalidateQueries(postLikedStatusQueryKey);
        queryClient.invalidateQueries(postOfFollowedAccountsQueryKey);
        queryClient.invalidateQueries(postsOfAccountQueryKey);
      },
      onError: (_error, _variables, restoreCache) => {
        restoreCache && restoreCache();
        toast.error("Помилка при зміні лайку");
      },
    }
  );
  return { currentStatus: isLiked, mutation };
}
