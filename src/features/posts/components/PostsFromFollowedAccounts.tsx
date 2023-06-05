import CenteredLoadingSpinner from "@/components/ui/CenteredLoadingSpinner";
import { usePostsOfFollowedAccountsQuery } from "../hooks/use-posts-of-followed-accounts-query";
import parseUnknownError from "@/lib/parse-unknown-error";
import SoftButton from "@/components/ui/SoftButton";
import { Fragment } from "react";
import PostItem from "./PostItem";

export default function PostsFromFollowedAccount() {
  const {
    data,
    isLoading,
    isError,
    error,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = usePostsOfFollowedAccountsQuery();

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
    <ul role="list" className="space-y-4 mt-8">
      {data?.pages.map((page, pageIndex) => (
        <Fragment key={pageIndex}>
          {page.data.map((item) => (
            <PostItem key={item.id} {...item} />
          ))}
        </Fragment>
      ))}
      {hasNextPage ? (
        <SoftButton disabled={isFetchingNextPage} onClick={handleLoadMoreClick}>
          {isFetchingNextPage ? "Завантаження..." : "Завантажити ще"}
        </SoftButton>
      ) : null}
    </ul>
  );
}
