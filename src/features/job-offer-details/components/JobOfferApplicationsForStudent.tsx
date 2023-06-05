import parseUnknownError from "@/lib/parse-unknown-error";
import { useJobOfferApplicationsQuery } from "../hooks/use-job-offer-applications-query";
import JobOfferApplicationSkeleton from "./JobOfferApplicationSkeleton";
import JobOfferApplicationItemForStudent from "./JobOfferApplicationItemForStudent";

export default function JobOfferApplicationsForStudent({
  jobOfferId,
}: {
  jobOfferId: string;
}) {
  const { data, isLoading, isError, error } =
    useJobOfferApplicationsQuery(jobOfferId);
  const noItems = data?.length === 0;

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
        data.map((item, itemIdx) => (
          <JobOfferApplicationItemForStudent key={itemIdx} {...item} />
        ))
      )}
    </ul>
  );
}
