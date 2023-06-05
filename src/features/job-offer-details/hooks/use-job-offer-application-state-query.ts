import { useProtectedQuery } from "@/hooks/useProtectedQuery";
import { request } from "@/lib/axios";
import { AxiosInstance, AxiosResponse } from "axios";
import { z } from "zod";

export function getJobOfferApplicationState(jobOfferId: string) {
  return (instance: AxiosInstance) => {
    return request({
      instance,
      url: `/Student/JobOffers/${jobOfferId}/applied`,
      method: "GET",
      select: (response: AxiosResponse) => z.boolean().parse(response.data),
    });
  };
}

export function useJobOfferApplicationQuery(jobOfferId: string) {
  const applicationStateQueryKey = ["job-offer-application-status", jobOfferId];
  return useProtectedQuery(
    applicationStateQueryKey,
    getJobOfferApplicationState(jobOfferId)
  );
}
