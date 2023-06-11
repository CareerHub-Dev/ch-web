import { request } from "@/lib/axios";
import { AxiosInstance } from "axios";
import { PostSchema } from "./use-self-posts-query";
import { useProtectedQuery } from "@/hooks/useProtectedQuery";

export function getPost(postId: string) {
  return (instance: AxiosInstance) => {
    return request({
      instance,
      url: `/Student/Posts/${postId}`,
      select: (response) => PostSchema.parse(response.data),
    });
  };
}

export function usePostQuery(postId: string) {
  return useProtectedQuery(["post", postId], getPost(postId));
}
