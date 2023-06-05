import useProtectedMutation from "@/hooks/useProtectedMutation";
import useToast from "@/hooks/useToast";
import { useQueryClient } from "@tanstack/react-query";
import { useCompanySubscriptionQuery } from "./use-company-subscription-query";
import { AxiosInstance } from "axios";
import { request } from "@/lib/axios";

export function unsubscribeStudentFromCompany(instance: AxiosInstance) {
  return (companyId: string) => {
    return request({
      instance,
      url: `/Student/Companies/${companyId}/subscribe`,
      method: "DELETE",
    });
  };
}

export function subscribeToCompany(instance: AxiosInstance) {
  return (companyId: string) => {
    return request({
      instance,
      url: `/Student/Companies/${companyId}/subscribe`,
      method: "POST",
    });
  };
}

export function useCompanySubscriptionMutation(companyId: string) {
  const subscriptionStateQueryKey = ["company-subscription-status", companyId];
  const { data: isSubscribed } = useCompanySubscriptionQuery(companyId);
  const toast = useToast();
  const queryClient = useQueryClient();
  return useProtectedMutation(
    ["company-subscription-change", companyId],
    isSubscribed ? unsubscribeStudentFromCompany : subscribeToCompany,
    {
      onError: (_error, _variables, restoreCache) => {
        restoreCache && restoreCache();
        toast.error("Помилка при зміні підписки");
      },
      onMutate: () => {
        const cachedStatus = queryClient.getQueryData(
          subscriptionStateQueryKey
        );
        const newStatus = !cachedStatus;
        queryClient.setQueryData(subscriptionStateQueryKey, newStatus);

        return () => {
          queryClient.setQueryData(subscriptionStateQueryKey, cachedStatus);
        };
      },
      onSuccess: (_data, _variables, restoreCache) => {
        restoreCache && restoreCache();
        queryClient.setQueryData(
          subscriptionStateQueryKey,
          (prev: any) => !(prev as boolean)
        );
      },
      onSettled: () => {
        queryClient.invalidateQueries(subscriptionStateQueryKey);
        queryClient.invalidateQueries([
          "student-company-subscriptions-amount",
          "self",
        ]);
      },
    }
  );
}
