import useProtectedMutation from "@/hooks/useProtectedMutation";
import useToast from "@/hooks/useToast";
import { request } from "@/lib/axios";
import parseUnknownError from "@/lib/parse-unknown-error";
import { useQueryClient } from "@tanstack/react-query";
import { AxiosInstance } from "axios";

export type PostData = {
  text: string;
  images: File[];
};

export function addPost() {
  return (instance: AxiosInstance) => {
    return (data: PostData) => {
      const formData = new FormData();
      formData.append("text", data.text);
      data.images.forEach((image) => {
        formData.append("images", image);
      });

      return request({
        instance,
        url: "Auth/Posts/self",
        method: "POST",
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    };
  };
}

export function useAddPostMutation() {
  const toast = useToast();
  const client = useQueryClient();
  const successMessage = "Публікацію створено";
  const queryKey = ["posts", "self"];

  return useProtectedMutation(queryKey, addPost(), {
    onSuccess() {
      toast.success(successMessage);
      client.invalidateQueries(queryKey);
    },
    onError(err) {
      toast.error("Помилка: " + parseUnknownError(err));
    },
  });
}
