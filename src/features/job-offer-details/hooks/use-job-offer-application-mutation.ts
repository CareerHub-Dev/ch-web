import useProtectedMutation from "@/hooks/useProtectedMutation";
import { request } from "@/lib/axios";
import { AxiosInstance } from "axios";
import useToast from "@/hooks/useToast";
import parseUnknownError from "@/lib/parse-unknown-error";

export function applyCvToJobOffer(instance: AxiosInstance) {
  return (data: { jobOfferId: string; cvId: string }) => {
    return request({
      method: "POST",
      url: "/Student/self/CVs/send-for-joboffer",
      data,
      instance,
    });
  };
}

export function useJobOfferApplicationMutation(
  options?: Omit<Parameters<typeof useProtectedMutation>[2], "onError">
) {
  const toast = useToast();
  return useProtectedMutation(["apply-cv-to-job-offer"], applyCvToJobOffer, {
    onError: (error) => {
      toast.error(parseUnknownError(error));
    },
    ...options,
  });
}
