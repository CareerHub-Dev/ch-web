import { StudentReviewSchema } from "@/features/student-applications/hooks/use-student-reviews-query";
import { useProtectedQuery } from "@/hooks/useProtectedQuery";
import { request } from "@/lib/axios";
import { AxiosInstance, AxiosResponse } from "axios";
import { z } from "zod";

export function getJobOfferApplications(jobOfferId: string) {
  return (instance: AxiosInstance) => {
    return request({
      instance,
      url: `/Student/JobOffers/${jobOfferId}/applications`,
      method: "GET",
      select: (response: AxiosResponse) =>
        z.array(StudentReviewSchema).parseAsync(response.data),
    });
  };
}

export function useJobOfferApplicationsQuery(jobOfferId: string) {
  const applicationsQueryKey = ["job-offer-applications", jobOfferId];
  return useProtectedQuery(
    applicationsQueryKey,
    getJobOfferApplications(jobOfferId)
  );
}
