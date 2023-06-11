import { useProtectedPaginatedQuery } from "@/hooks/useProtectedPaginatedQuery";
import { getCompanyJobOffers } from "@/lib/api/company";
import parseUnknownError from "@/lib/parse-unknown-error";
import JobOfferListItem from "./JobOfferListItem";
import { Fragment } from "react";
import CenteredLoadingSpinner from "@/components/ui/CenteredLoadingSpinner";

export default function JobOfferList() {
  const { data, isLoading, isError, error } = useProtectedPaginatedQuery({
    queryKey: ["company-self-job-offers"],
    getItems: getCompanyJobOffers,
    params: {
      companyId: "self",
      pageSize: 36,
      active: true,
    },
  });

  if (isLoading) {
    return <CenteredLoadingSpinner />;
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
