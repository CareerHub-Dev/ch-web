import SoftButton from "@/components/ui/SoftButton";
import { useJobOffersQuery } from "../hooks/use-job-offers-query";
import JobOffersList from "./JobOffersList";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import CenteredLoadingSpinner from "@/components/ui/CenteredLoadingSpinner";
import parseUnknownError from "@/lib/parse-unknown-error";

export default function CommonJobOffersFeed() {
  const {
    data,
    isLoading,
    isError,
    error,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useJobOffersQuery();

  const loadMore = () => {
    if (hasNextPage) {
      fetchNextPage();
    }
  };

  return isLoading ? (
    <CenteredLoadingSpinner />
  ) : isError ? (
    <p className="text-center text-red-600">{parseUnknownError(error)}</p>
  ) : (
    <>
      <JobOffersList data={data} />
      {hasNextPage || isFetchingNextPage ? (
        <div className="flex items-center justify-center mt-6 mb-12">
          <SoftButton
            size="md"
            className="flex items-center justify-center"
            onClick={loadMore}
            disabled={isFetchingNextPage}
          >
            {isFetchingNextPage ? (
              <LoadingSpinner className="text-blue-600 h-5 mr-1.5" />
            ) : null}
            {"Завантажити більше"}
          </SoftButton>
        </div>
      ) : null}
    </>
  );
}
