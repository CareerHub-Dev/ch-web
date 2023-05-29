import { useProtectedPaginatedQuery } from "@/hooks/useProtectedPaginatedQuery";
import RecentPostSkeleton from "./RecentPostSkeleton";
import RecentPost from "./RecentPost";
import parseUnknownError from "@/lib/parse-unknown-error";
import { Fragment } from "react";
import { getPostsFromFollowedAccounts } from "@/features/posts/hooks/use-self-posts-query";

export default function RecentPosts() {
  const { data, isLoading, isError, error } = useProtectedPaginatedQuery({
    queryKey: ["recent-posts"],
    getItems: getPostsFromFollowedAccounts,
    params: { page: 1, pageSize: 3 },
  });

  const thereAreNoPosts =
    !isLoading &&
    !isError &&
    data.pages.length > 0 &&
    data.pages.at(0)?.data.length === 0;

  const thereAreSomePosts = !isLoading && !isError && !thereAreNoPosts;

  return (
    <>
      <div className="mt-6 flow-root">
        <ul role="list" className="-my-4 divide-y divide-gray-200">
          {isLoading ? (
            Array.from({ length: 3 }).map((_, index) => (
              <RecentPostSkeleton key={index} />
            ))
          ) : isError ? (
            <p className="text-red-500">
              {`Помилка завантаження: ${parseUnknownError(error)}`}
            </p>
          ) : thereAreNoPosts ? (
            <p className="text-gray-500">{"Публікацій немає"}</p>
          ) : (
            data.pages.map((page, pageIndex) => (
              <Fragment key={pageIndex}>
                {page.data.map((item, itemIndex) => (
                  <RecentPost key={itemIndex} {...item} />
                ))}
              </Fragment>
            ))
          )}
        </ul>
      </div>
      {thereAreSomePosts ? (
        <div className="mt-6">
          <button className="block w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-center text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 focus:ring-offset-gray-100 transition-all duration-200">
            {"Дивитися більше"}
          </button>
        </div>
      ) : null}
    </>
  );
}
