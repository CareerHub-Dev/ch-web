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

export function addOrEditPost(initialPayload?: {
    id: string;
    text: string;
    images: string[];
}) {
    return (instance: AxiosInstance) => {
        const { method, url } = initialPayload
            ? {
                  method: "PUT",
                  url: `Auth/Posts/self/${initialPayload.id}`,
              }
            : {
                  method: "POST",
                  url: "Auth/Posts/self",
              };

        return (data: PostData) => {
            const formData = new FormData();
            formData.append("text", data.text);
            data.images.forEach((image) => {
                formData.append("images", image);
            });

            return request({
                instance,
                url,
                method,
                data: formData,
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
        };
    };
}

export function useAddOrEditPostMutation(initialPayload?: {
    id: string;
    text: string;
    images: string[];
}) {
    const toast = useToast();
    const client = useQueryClient();

    const { successMessage, queryKey } = initialPayload
        ? {
              successMessage: "Публікацію відредаговано",
              queryKey: ["posts", "self", initialPayload.id],
          }
        : {
              successMessage: "Публікацію створено",
              queryKey: ["posts", "self"],
          };

    return useProtectedMutation(queryKey, addOrEditPost(initialPayload), {
        onSuccess() {
            toast.success(successMessage);
            client.invalidateQueries(["posts", "self"]);
        },
        onError(err) {
            toast.error("Помилка: " + parseUnknownError(err));
        },
    });
}
