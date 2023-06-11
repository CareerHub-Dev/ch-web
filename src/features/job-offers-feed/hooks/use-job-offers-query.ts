import useSession from "@/hooks/useSession";
import { useProtectedPaginatedQuery } from "@/hooks/useProtectedPaginatedQuery";
import { useJobOffersFeedStore } from "../store/job-offers-feed-store";
import { getJobOffers, getSelfJobOffersAsCompany } from "@/lib/api/job-offer";
import { useDebounce } from "usehooks-ts";
import { selectQueryParams } from "../store/job-offers-feed-store/selectors";
import { AxiosInstance } from "axios";
import { request } from "@/lib/axios";
import { parsePaginatedResponseAsync } from "@/lib/api/pagination";
import { JobOfferFeedSchema } from "@/lib/api/job-offer/schemas";

export function useJobOffersQuery() {
  const filters = useJobOffersFeedStore(selectQueryParams);
  const debouncedFilters = useDebounce(filters, 200);
  const { data } = useSession();
  let getItems = getJobOffers;

  if (data?.role === "Company") {
    getItems = getSelfJobOffersAsCompany;
  }

  return useProtectedPaginatedQuery({
    queryKey: ["job-offers-feed", debouncedFilters],
    getItems,
    params: {
      pageSize: 36,
      ...debouncedFilters,
    },
  });
}

export function getSelfTrackedJobOffers(
  instance: AxiosInstance,
  params: PaginatedQueryParams
) {
  return request({
    instance,
    url: `/Student/Students/self/jobOffer-subscriptions`,
    params,
    select: parsePaginatedResponseAsync(JobOfferFeedSchema),
  });
}

export function useTrackedJobOffersQuery() {
  const filters = useJobOffersFeedStore(selectQueryParams);
  const debouncedFilters = useDebounce(filters, 200);

  return useProtectedPaginatedQuery({
    queryKey: ["tracked-job-offers-feed", debouncedFilters],
    getItems: getSelfTrackedJobOffers,
    params: {
      pageSize: 36,
      ...debouncedFilters,
    },
  });
}
