import { PaginatedResponse } from "@/lib/api/pagination";
import { StudentSubscriptionsParams } from "@/lib/api/student";
import parseUnknownError from "@/lib/parse-unknown-error";
import { AxiosInstance } from "axios";
import { Fragment } from "react";
import { useProtectedPaginatedQuery } from "@/hooks/useProtectedPaginatedQuery";
import FollowedStudentSkeleton from "../aside-sections/followed-students/FollowedStudentSkeleton";

export default function ModalList<TItem extends { id: string }>({
    getItems,
    Item,
    queryKeyPrefix,
    accountId,
    isSelf,
    search,
}: {
    getItems: (
        instance: AxiosInstance,
        params: StudentSubscriptionsParams
    ) => Promise<PaginatedResponse<Array<TItem>>>;
    Item: (props: TItem) => JSX.Element;
    queryKeyPrefix: string;
    accountId: string;
    isSelf: boolean;
    search: string;
}) {
    const params = {
        accountId,
        pageSize: 36,
        search,
    };
    const { data, isLoading, isError, error } = useProtectedPaginatedQuery({
        queryKey: [queryKeyPrefix, isSelf ? "self" : accountId, search],
        getItems,
        params,
    });
    return (
        <div className="my-4 overflow-y-auto sm:max-h-[45vh]">
            {isLoading ? (
                <ul className="flex flex-col divide-y divide-gray-200">
                    <FollowedStudentSkeleton />
                </ul>
            ) : isError ? (
                <p className="text-red-500 text-center">
                    {parseUnknownError(error)}
                </p>
            ) : data.pages?.at(0)?.data.length === 0 ? (
                <p className="text-center">{"Нічого не знайдено"}</p>
            ) : (
                <ul className="flex flex-col divide-y divide-gray-200">
                    {data.pages.map((page, pageIndex) => (
                        <Fragment key={pageIndex}>
                            {page.data.map((item) => (
                                <Item key={item.id} {...item} />
                            ))}
                        </Fragment>
                    ))}
                </ul>
            )}
        </div>
    );
}
