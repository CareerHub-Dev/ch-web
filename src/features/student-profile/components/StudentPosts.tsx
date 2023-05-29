import { getPostsFromAccount } from "@/features/posts/hooks/use-self-posts-query";
import { useProtectedPaginatedQuery } from "@/hooks/useProtectedPaginatedQuery";
import parseUnknownError from "@/lib/parse-unknown-error";
import { Fragment } from "react";

export default function StudentPosts({
  accountId,
  isSelf,
}: {
  accountId: string;
  isSelf: boolean;
}) {
  const queryKeyIdPart = isSelf ? "self" : accountId;
  const { data, isLoading, isError, error } = useProtectedPaginatedQuery({
    queryKey: ["student-posts", queryKeyIdPart],
    getItems: getPostsFromAccount,
    params: { accountId, pageSize: 36 },
  });

  return (
    <div className="my-4 overflow-y-auto sm:max-h-[45vh]">
      {isLoading ? (
        <ul className="flex flex-col divide-y divide-gray-200">...</ul>
      ) : isError ? (
        <p className="text-red-500 text-center">{parseUnknownError(error)}</p>
      ) : data.pages?.at(0)?.data.length === 0 ? (
        <p className="text-center">{"Нічого не знайдено"}</p>
      ) : (
        <ul className="flex flex-col divide-y divide-gray-200">
          {data.pages.map((page, pageIndex) => (
            <Fragment key={pageIndex}>{page.data.map(() => "item")}</Fragment>
          ))}
        </ul>
      )}
    </div>
  );
}
