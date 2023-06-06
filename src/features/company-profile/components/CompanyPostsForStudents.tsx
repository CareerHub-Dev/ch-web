import { usePostsOfAccountQuery } from "@/features/posts/hooks/use-posts-of-account-query";
import parseUnknownError from "@/lib/parse-unknown-error";
import CenteredLoadingSpinner from "@/components/ui/CenteredLoadingSpinner";
import { Fragment } from "react";
import PostItem from "@/features/posts/components/PostItem";
import SoftButton from "@/components/ui/SoftButton";

export default function CompanyPostsForStudents({
  companyId,
}: {
  companyId: string;
}) {
  const {
    data,
    isLoading,
    isError,
    error,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = usePostsOfAccountQuery(companyId);

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
    return <p className="text-center text-gray-500">{"Немає публікацій"}</p>;
  }

  return (
    <ul role="list" className="space-y-4 mt-8">
      {data?.pages.map((page, pageIndex) => (
        <Fragment key={pageIndex}>
          {page.data.map((item) => (
            <PostItem key={item.id} {...item} />
          ))}
        </Fragment>
      ))}
      {hasNextPage ? (
        <SoftButton
          disabled={isFetchingNextPage}
          onClick={() => fetchNextPage()}
        >
          {isFetchingNextPage ? "Завантаження..." : "Завантажити ще"}
        </SoftButton>
      ) : null}
    </ul>
  );
}
