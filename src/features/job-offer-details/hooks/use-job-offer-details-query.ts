import useProtectedMutation from "@/hooks/useProtectedMutation";
import { useProtectedQuery } from "@/hooks/useProtectedQuery";
import { deleteJobOffer, getJobOfferAsCompany } from "@/lib/api/job-offer";

export function useJobOfferDetailsAsCompanyQuery(jobOfferId: string) {
  return useProtectedQuery(
    ["job-offer", jobOfferId],
    getJobOfferAsCompany(jobOfferId)
  );
}

export function useDeleteJobOfferMutation() {
  return useProtectedMutation(["delete-job-offer"], deleteJobOffer);
}
