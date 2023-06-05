import { useProtectedQuery } from "@/hooks/useProtectedQuery";
import { request } from "@/lib/axios";
import { AxiosInstance, AxiosResponse } from "axios";
import { z } from "zod";

export function getJobOfferSubscriptionState(jobOfferId: string) {
  return (instance: AxiosInstance) => {
    return request({
      instance,
      url: `/Student/JobOffers/${jobOfferId}/subscribe`,
      method: "GET",
      select: (response: AxiosResponse) => z.boolean().parse(response.data),
    });
  };
}

export function useJobOfferSubscriptionQuery(jobOfferId: string) {
  const subscriptionStateQueryKey = [
    "job-offer-subscription-status",
    jobOfferId,
  ];
  return useProtectedQuery(
    subscriptionStateQueryKey,
    getJobOfferSubscriptionState(jobOfferId)
  );
}
