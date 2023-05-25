import { useProtectedPaginatedQuery } from "@/hooks/useProtectedPaginatedQuery";
import { getCompanyJobOffers } from "@/lib/api/company";

export function useCompanyJobOffersQuery(companyId: string, search: string) {
    return useProtectedPaginatedQuery({
        queryKey: ["company-job-offers", companyId, search],
        getItems: getCompanyJobOffers,
        params: {
            search,
            companyId,
            pageSize: 36,
        },
    });
}
