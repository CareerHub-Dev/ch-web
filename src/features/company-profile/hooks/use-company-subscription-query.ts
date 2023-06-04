import { useProtectedQuery } from "@/hooks/useProtectedQuery";
import { request } from "@/lib/axios";
import { AxiosInstance, AxiosResponse } from "axios";
import { z } from "zod";

export function getCompanySubscriptionState(companyId: string) {
  return (instance: AxiosInstance) => {
    return request({
      instance,
      url: `/Student/Companies/${companyId}/subscribe`,
      method: "GET",
      select: (response: AxiosResponse) => z.boolean().parse(response.data),
    });
  };
}

export function useCompanySubscriptionQuery(companyId: string) {
  const subscriptionStateQueryKey = ["company-subscription-status", companyId];
  return useProtectedQuery(
    subscriptionStateQueryKey,
    getCompanySubscriptionState(companyId)
  );
}
