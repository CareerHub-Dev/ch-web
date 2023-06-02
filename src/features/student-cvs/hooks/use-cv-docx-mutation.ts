import { request } from "@/lib/axios";
import { AxiosInstance } from "axios";
import useToast from "@/hooks/useToast";
import parseUnknownError from "@/lib/parse-unknown-error";
import useProtectedMutation from "@/hooks/useProtectedMutation";

function requestCvDocxFile(instance: AxiosInstance) {
  return (cvId: string) => {
    return request({
      instance,
      method: "GET",
      url: `/Student/self/CVs/${cvId}/word`,
      responseType: "blob",
      select: (res) => {
        if (!(res.data instanceof Blob)) {
          throw new Error("Неочікувана відповідь від серверу");
        }
        return res.data;
      },
    });
  };
}

export function useCvDocxMutation(fileName?: string) {
  const toast = useToast();
  return useProtectedMutation(["cvDocx"], requestCvDocxFile, {
    onMutate: () => {
      toast.setCurrent("Завантаження файлу...");
    },
    onSuccess: (data) => {
      const url = URL.createObjectURL(data);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", fileName ?? "CV.docx");
      document.body.appendChild(link);
      link.click();
      link.parentNode?.removeChild(link);
      toast.clearCurrent();
    },
    onError: (err) => {
      toast.error(
        `Помилка при отриманні файлу: ${parseUnknownError(err)}`,
        true
      );
    },
  });
}
