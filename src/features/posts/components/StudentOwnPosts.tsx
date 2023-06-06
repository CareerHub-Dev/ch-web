import CenteredLoadingSpinner from "@/components/ui/CenteredLoadingSpinner";
import { useSelfPostsQuery } from "../hooks/use-self-posts-query";
import parseUnknownError from "@/lib/parse-unknown-error";
import SoftButton from "@/components/ui/SoftButton";
import { Fragment } from "react";
import SelfPostItem from "./SelfPostItem";
import { useRemovePostMutation } from "../hooks/use-remove-post-mutation";

export default function StudentOwnPosts() {
  const {
    data,
    isLoading,
    isError,
    error,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useSelfPostsQuery();
  const removeMutation = useRemovePostMutation();

  const handleLoadMoreClick = () => {
    fetchNextPage();
  };

  const handleRemoval = (postId: string) => {
    removeMutation.mutate(postId);
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
            <SelfPostItem
              key={item.id}
              {...item}
              onRemove={() => handleRemoval(item.id)}
            />
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
