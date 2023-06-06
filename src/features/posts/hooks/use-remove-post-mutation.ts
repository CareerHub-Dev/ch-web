import useProtectedMutation from "@/hooks/useProtectedMutation";
import useToast from "@/hooks/useToast";
import { request } from "@/lib/axios";
import { removeFromPaginatedCache } from "@/lib/paginated-cache";
import parseUnknownError from "@/lib/parse-unknown-error";
import { useQueryClient } from "@tanstack/react-query";
import { AxiosInstance } from "axios";

export function removePost(instance: AxiosInstance) {
  return (postId: string) => {
    return request({
      instance,
      url: `Auth/Posts/self/${postId}`,
      method: "DELETE",
    });
  };
}

export function useRemovePostMutation() {
  const toast = useToast();
  const client = useQueryClient();
  const queryKey = ["posts", "self"];

  return useProtectedMutation(["remove-post"], removePost, {
    onMutate: (postId) => {
      const cachedStatus = client.getQueryData(queryKey);
      client.setQueryData(
        queryKey,
        removeFromPaginatedCache(cachedStatus, postId)
      );

      return () => {
        client.setQueryData(queryKey, cachedStatus);
      };
    },
    onError: (error, _variables, restoreCache) => {
      if (restoreCache) {
        restoreCache();
      }
      toast.error(
        "Помилка при видаленні публікації: " + parseUnknownError(error)
      );
    },
    onSettled: () => {
      client.invalidateQueries(queryKey);
    },
  });
}
