import useProtectedMutation from "@/hooks/useProtectedMutation";
import useToast from "@/hooks/useToast";
import { request } from "@/lib/axios";
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

  return useProtectedMutation(["posts", "self"], removePost, {
    onSuccess() {
      toast.success("Публікацію видалено");
      client.invalidateQueries(["posts", "self"]);
    },
    onError(err) {
      toast.error("Помилка: " + parseUnknownError(err));
    },
  });
}
