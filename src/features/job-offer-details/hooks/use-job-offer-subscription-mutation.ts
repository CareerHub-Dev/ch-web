import useProtectedMutation from "@/hooks/useProtectedMutation";
import useToast from "@/hooks/useToast";
import { useQueryClient } from "@tanstack/react-query";
import { useJobOfferSubscriptionQuery } from "./use-job-offer-subscription-query";
import { AxiosInstance } from "axios";
import { request } from "@/lib/axios";

export function unsubscribeStudentFromJobOffer(instance: AxiosInstance) {
  return (jobOfferId: string) => {
    return request({
      instance,
      url: `/Student/JobOffers/${jobOfferId}/subscribe`,
      method: "DELETE",
    });
  };
}

export function subscribeToJobOffer(instance: AxiosInstance) {
  return (jobOfferId: string) => {
    return request({
      instance,
      url: `/Student/JobOffers/${jobOfferId}/subscribe`,
      method: "POST",
    });
  };
}

export function useJobOfferSubscriptionMutation(jobOfferId: string) {
  const subscriptionStateQueryKey = [
    "job-offer-subscription-status",
    jobOfferId,
  ];
  const { data: isSubscribed } = useJobOfferSubscriptionQuery(jobOfferId);
  const toast = useToast();
  const queryClient = useQueryClient();
  return useProtectedMutation(
    ["job-offer-subscription-change", jobOfferId],
    isSubscribed ? unsubscribeStudentFromJobOffer : subscribeToJobOffer,
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
          "student-job-offer-subscriptions-amount",
          "self",
        ]);
      },
    }
  );
}
