import { useProtectedPaginatedQuery } from "@/hooks/useProtectedPaginatedQuery";
import { getCompanySelfJobOffers } from "@/lib/api/company";
import parseUnknownError from "@/lib/parse-unknown-error";
import JobOfferListItem from "./JobOfferListItem";
import JobOfferLoadingSkeleton from "./JobOfferLoadingSkeleton";
import { Fragment } from "react";

export default function JobOfferList() {
    const { data, isLoading, isError, error } = useProtectedPaginatedQuery({
        queryKey: ["company-self-job-offers"],
        getItems: getCompanySelfJobOffers,
        params: {
            pageSize: 36,
            active: true,
        },
    });

    if (isLoading) {
        return (
            <ul className="divide-y divide-gray-200">
                {Array.from({ length: 10 }).map((_, index) => (
                    <JobOfferLoadingSkeleton key={index} />
                ))}
            </ul>
        );
    }

    if (isError) {
        return <div>{parseUnknownError(error)}</div>;
    }

    const firstPage = data.pages.at(0);
    const noFirstPage = firstPage === undefined || firstPage.data.length === 0;

    return (
        <ul role="list" className="divide-y divide-gray-100">
            {noFirstPage ? (
                <p className="text-gray-500">{"Немає активних вакансій"}</p>
            ) : (
                data.pages.map((page, pageIdx) => (
                    <Fragment key={pageIdx}>
                        {page.data.map((jobOffer) => (
                            <JobOfferListItem key={jobOffer.id} {...jobOffer} />
                        ))}
                    </Fragment>
                ))
            )}
        </ul>
    );
}
