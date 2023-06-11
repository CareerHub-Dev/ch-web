import { useProtectedQuery } from "@/hooks/useProtectedQuery";
import { getJobOfferAsCompany } from "@/lib/api/job-offer";

export function useJobOfferDetailsAsCompanyQuery(jobOfferId: string) {
  return useProtectedQuery(
    ["job-offer", jobOfferId],
    getJobOfferAsCompany(jobOfferId)
  );
}
