import { request } from "@/lib/axios";
import { AxiosInstance } from "axios";
import useToast from "@/hooks/useToast";
import useSession from "@/hooks/useSession";
import parseUnknownError from "@/lib/parse-unknown-error";
import useProtectedMutation from "@/hooks/useProtectedMutation";
import { UserRole } from "@/lib/schemas/UserRole";

function requestCvDocxFile(role: UserRole) {
  return (instance: AxiosInstance) => {
    return (cvId: string) => {
      const url =
        role === "Student"
          ? `/Student/self/CVs/${cvId}/word`
          : `/Company/CVs/${cvId}/word`;
      return request({
        instance,
        method: "GET",
        url,
        responseType: "blob",
        select: (res) => {
          if (!(res.data instanceof Blob)) {
            throw new Error("Неочікувана відповідь від серверу");
          }
          return res.data;
        },
      });
    };
  };
}

export function useCvDocxMutation(fileName?: string) {
  const toast = useToast();
  const session = useSession();
  const role = session.data?.role ?? "Student";

  return useProtectedMutation(["cvDocx"], requestCvDocxFile(role), {
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
