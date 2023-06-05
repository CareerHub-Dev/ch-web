import { useProtectedQuery } from "@/hooks/useProtectedQuery";
import { request } from "@/lib/axios";
import { AxiosInstance, AxiosResponse } from "axios";
import { z } from "zod";

const JobOfferApplicaitonSchema = z.object({
  cvId: z.string(),
  jobOfferId: z.string(),
  title: z.string(),
  status: z.string(),
  message: z.string().nullable(),
  created: z.string(),
});

export type JobOfferApplication = z.infer<typeof JobOfferApplicaitonSchema>;

export function getJobOfferApplications(jobOfferId: string) {
  return (instance: AxiosInstance) => {
    return request({
      instance,
      url: `/Student/JobOffers/${jobOfferId}/applications`,
      method: "GET",
      select: (response: AxiosResponse) =>
        z.array(JobOfferApplicaitonSchema).parseAsync(response.data),
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
