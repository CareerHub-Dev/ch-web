import useSession from "@/hooks/useSession";
import { useProtectedPaginatedQuery } from "@/hooks/useProtectedPaginatedQuery";
import { useJobOffersFeedStore } from "../store/job-offers-feed-store";
import { getJobOffers, getSelfJobOffersAsCompany } from "@/lib/api/job-offer";
import { useDebounce } from "usehooks-ts";
import { selectQueryParams } from "../store/job-offers-feed-store/selectors";

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
