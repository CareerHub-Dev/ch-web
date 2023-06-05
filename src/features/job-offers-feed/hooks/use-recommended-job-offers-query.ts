import { useProtectedPaginatedQuery } from "@/hooks/useProtectedPaginatedQuery";
import { useJobOffersFeedStore } from "../store/job-offers-feed-store";
import { getRecommendedJobOffers } from "@/lib/api/job-offer";
import { useDebounce } from "usehooks-ts";
import { selectQueryParams } from "../store/job-offers-feed-store/selectors";

export function useRecommendedJobOffersQuery() {
  const filters = useJobOffersFeedStore(selectQueryParams);
  const debouncedFilters = useDebounce(filters, 200);

  return useProtectedPaginatedQuery({
    queryKey: ["recommended-job-offers-feed", debouncedFilters],
    getItems: getRecommendedJobOffers,
    params: {
      pageSize: 36,
      ...debouncedFilters,
    },
  });
}
