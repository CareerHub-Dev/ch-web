import { getPostsFromAccount } from "@/features/posts/hooks/use-self-posts-query";
import { useProtectedPaginatedQuery } from "@/hooks/useProtectedPaginatedQuery";
import { useBoolean } from "usehooks-ts";
import parseUnknownError from "@/lib/parse-unknown-error";
import { Fragment } from "react";
import StudentPost from "./StudentPost";
import PrimaryButton from "@/components/ui/PrimaryButton";
import AddOrEditPostForm from "@/features/posts/components/AddPostForm";

export default function StudentPosts({
  accountId,
  isSelf,
}: {
  accountId: string;
  isSelf: boolean;
}) {
  const queryKeyIdPart = isSelf ? "self" : accountId;
  const isAddFormOpen = useBoolean(false);
  const { data, isLoading, isError, error } = useProtectedPaginatedQuery({
    queryKey: ["posts", queryKeyIdPart],
    getItems: getPostsFromAccount,
    params: { accountId, pageSize: 36 },
  });

  return (
    <div className="my-4 sm:max-h-[45vh]">
      {isSelf ? (
        <div className="flex justify-end mb-4">
          <AddOrEditPostForm
            show={isAddFormOpen.value}
            onClose={isAddFormOpen.setFalse}
          />
          <PrimaryButton onClick={isAddFormOpen.setTrue}>Додати</PrimaryButton>
        </div>
      ) : null}

      {isLoading ? (
        <ul className="flex flex-col divide-y divide-gray-200 gap-4">...</ul>
      ) : isError ? (
        <p className="text-red-500 text-center">{parseUnknownError(error)}</p>
      ) : data.pages?.at(0)?.data.length === 0 ? (
        <p className="text-center">{"Нічого не знайдено"}</p>
      ) : (
        <ul className="flex flex-col divide-y divide-gray-200 gap-4">
          {data.pages.map((page, pageIndex) => (
            <Fragment key={pageIndex}>
              {page.data.map((item) => (
                <StudentPost key={item.id} isSelf={isSelf} post={item} />
              ))}
            </Fragment>
          ))}
        </ul>
      )}
    </div>
  );
}
