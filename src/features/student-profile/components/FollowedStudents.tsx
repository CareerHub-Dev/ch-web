import { useProtectedPaginatedQuery } from "@/hooks/useProtectedPaginatedQuery";
import { getStudentStudentSubscriptions } from "@/lib/api/student";
import parseUnknownError from "@/lib/parse-unknown-error";
import { Fragment } from "react";
import FollowedStudent from "./FollowedStudent";
import FollowedStudentSkeleton from "./FollowedStudentSkeleton";

export default function FollowedStudents({ accountId }: { accountId: string }) {
    const { data, isLoading, isError, error } = useProtectedPaginatedQuery({
        queryKey: ["recent-subscriptions", accountId],
        getItems: getStudentStudentSubscriptions,
        params: { accountId: accountId, page: 1, pageSize: 3 },
    });

    const thereAreNoSubscriptions =
        !isLoading &&
        !isError &&
        data.pages.length > 0 &&
        data.pages.at(0)?.data.length === 0;

    const thereAreSubscriptions =
        !isLoading && !isError && !thereAreNoSubscriptions;

    return (
        <>
            <div className="mt-6 flow-root">
                <ul className="-my-4 divide-y divide-gray-200">
                    {isLoading ? (
                        Array.from({ length: 3 }).map((_, index) => (
                            <FollowedStudentSkeleton key={index} />
                        ))
                    ) : isError ? (
                        <p className="text-red-500">
                            {`Помилка завантаження: ${parseUnknownError(
                                error
                            )}`}
                        </p>
                    ) : thereAreNoSubscriptions ? (
                        <p className="text-gray-500">{"Немає підписок"}</p>
                    ) : (
                        data.pages.map((page, pageIndex) => (
                            <Fragment key={pageIndex}>
                                {page.data.map((item, itemIndex) => (
                                    <FollowedStudent
                                        key={itemIndex}
                                        {...item}
                                    />
                                ))}
                            </Fragment>
                        ))
                    )}
                </ul>
            </div>
            {thereAreSubscriptions ? (
                <div className="mt-6">
                    <button className="block w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-center text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50">
                        {"Дивитися більше"}
                    </button>
                </div>
            ) : null}
        </>
    );
}
