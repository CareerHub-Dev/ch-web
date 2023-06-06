import CenteredLoadingSpinner from "@/components/ui/CenteredLoadingSpinner";
import parseUnknownError from "@/lib/parse-unknown-error";
import SoftButton from "@/components/ui/SoftButton";
import { Fragment, useState } from "react";
import { useBoolean } from "usehooks-ts";
import { useStudentReviewsQuery } from "../../student-applications/hooks/use-student-reviews-query";
import StudentApplicationReviewItem from "@/features/student-applications/components/StudentApplicationReviewItem";
import StudentApplicationReviewDialog from "@/features/student-applications/components/StudentApplicationReviewDialog";

export default function StudentApplicationsReviews() {
  const {
    data,
    isLoading,
    isError,
    error,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useStudentReviewsQuery();

  const [focusedReviewId, setFocusedRevewId] = useState<string | null>(null);
  const viewDialogIsOpen = useBoolean(false);

  const openViewDialog = (reviewId: string) => {
    setFocusedRevewId(reviewId);
    viewDialogIsOpen.setTrue();
  };

  const handleLoadMoreClick = () => {
    fetchNextPage();
  };

  if (isLoading) {
    return <CenteredLoadingSpinner />;
  }
  if (isError) {
    return (
      <p className="text-center text-red-600">{parseUnknownError(error)}</p>
    );
  }

  const noPosts =
    data.pages[0] === undefined ||
    data.pages[0].data === undefined ||
    data.pages[0].data.length === 0;

  if (noPosts) {
    return <p className="text-center text-gray-500">{"Немає постів"}</p>;
  }

  return (
    <>
      <StudentApplicationReviewDialog
        show={viewDialogIsOpen.value}
        onClose={viewDialogIsOpen.setFalse}
        applicationId={focusedReviewId}
      />
      <ul
        role="list"
        className="space-y-4 mt-8 bg-white shadow-sm rounded-md divide-y divide-gray-100 px-12 py-4"
      >
        {data?.pages.map((page, pageIndex) => (
          <Fragment key={pageIndex}>
            {page.data.map((item, itemIdx) => (
              <StudentApplicationReviewItem
                key={itemIdx}
                {...item}
                onViewClick={() => openViewDialog(item.id)}
              />
            ))}
          </Fragment>
        ))}
        {hasNextPage ? (
          <SoftButton
            disabled={isFetchingNextPage}
            onClick={handleLoadMoreClick}
          >
            {isFetchingNextPage ? "Завантаження..." : "Завантажити ще"}
          </SoftButton>
        ) : null}
      </ul>
    </>
  );
}
