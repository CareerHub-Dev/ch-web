import { useProtectedPaginatedQuery } from "@/hooks/useProtectedPaginatedQuery";
import { getStudentStudentSubscriptions } from "@/lib/api/student";
import parseUnknownError from "@/lib/parse-unknown-error";
import { Fragment } from "react";
import FollowedStudent from "./FollowedStudent";
import FollowedStudentSkeleton from "./FollowedStudentSkeleton";
import { useStudentProfileStore } from "../store/student-profile-store";

export default function FollowedStudents({ accountId }: { accountId: string }) {
    const openModal = useStudentProfileStore((s) => s.openModal);
    const { data, isLoading, isError, error } = useProtectedPaginatedQuery({
        queryKey: ["recent-subscriptions", accountId],
        getItems: getStudentStudentSubscriptions,
        params: { accountId: accountId, page: 1, pageSize: 3 },
    });

    const handleShowAllClick = () => {
        openModal("followedStudents");
    };

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
                    <button
                        className="block w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-center text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2 focus:ring-offset-gray-100 transition-all duration-200"
                        onClick={handleShowAllClick}
                    >
                        {"Дивитися більше"}
                    </button>
                </div>
            ) : null}
        </>
    );
}
