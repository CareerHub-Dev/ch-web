import { useProtectedPaginatedQuery } from "@/hooks/useProtectedPaginatedQuery";
import { getJobOfferApplications } from "@/lib/api/job-offer";
import JobOfferApplicationSkeleton from "./JobOfferApplicationSkeleton";
import parseUnknownError from "@/lib/parse-unknown-error";
import { Fragment } from "react";
import JobOfferApplicationItem from "./JobOfferApplicationItem";

export default function JobOfferApplications({
  jobOfferId,
}: {
  jobOfferId: string;
}) {
  const { data, isLoading, isError, error } = useProtectedPaginatedQuery({
    queryKey: ["jobOfferApplications", jobOfferId],
    getItems: getJobOfferApplications,
    params: {
      jobOfferId,
      pageSize: 36,
    },
  });
  const noItems =
    data?.pages.at(0)?.data === undefined ||
    data?.pages.at(0)?.data.length === 0;

  return (
    <ul
      role="list"
      className="mt-5 divide-y divide-gray-200 border-t border-gray-200 sm:mt-0 sm:border-t-0"
    >
      {isLoading ? (
        Array.from({ length: 6 }).map((_, itemIdx) => (
          <JobOfferApplicationSkeleton key={itemIdx} />
        ))
      ) : isError ? (
        <p className="text-center text-red-600">{parseUnknownError(error)}</p>
      ) : noItems ? (
        <p className="text-center text-gray-500">{"Немає поданих резюме"}</p>
      ) : (
        data.pages.map((page, pageIdx) => (
          <Fragment key={pageIdx}>
            {page.data.map((item, itemIdx) => (
              <JobOfferApplicationItem key={itemIdx} {...item} />
            ))}
          </Fragment>
        ))
      )}
    </ul>
  );
}
