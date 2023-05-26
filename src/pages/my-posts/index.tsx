import CommonLayout from "@/components/layout/CommonLayout";
import AddPostForm from "@/features/posts/components/AddPostForm";
import { protectedSsr } from "@/lib/protected-ssr";
import CenteredLoadingSpinner from "@/components/ui/CenteredLoadingSpinner";
import parseUnknownError from "@/lib/parse-unknown-error";
import { Fragment } from "react";
import { useSelfPostsQuery } from "@/features/posts/hooks/use-self-posts-query";
import { useBoolean } from "usehooks-ts";
import PrimaryButton from "@/components/ui/PrimaryButton";
import { PlusSmallIcon } from "@heroicons/react/24/solid";
import SelfPostItem from "@/features/posts/components/SelfPostItem";

export default function CompanyPostsPage() {
    const { data, isLoading, isError, error } = useSelfPostsQuery();
    const addPostDialogIsOpen = useBoolean(false);
    const noData =
        data === undefined ||
        data.pages[0] === undefined ||
        data.pages[0].data.length === 0;

    return (
        <>
            <AddPostForm
                show={addPostDialogIsOpen.value}
                onClose={addPostDialogIsOpen.setFalse}
            />

            <div className="flex flex-wrap flex-col sm:flex-row items-center gap-6 px-4 sm:flex-nowrap sm:px-6 lg:px-8 py-4">
                <h1 className="text-base font-semibold leading-7 text-gray-900">
                    {"Мої публікації"}
                </h1>
                <PrimaryButton
                    onClick={addPostDialogIsOpen.setTrue}
                    className="sm:ml-auto flex items-center gap-x-1 rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                >
                    <PlusSmallIcon
                        className="-ml-1.5 h-5 w-5"
                        aria-hidden="true"
                    />
                    {"Додати публікацію"}
                </PrimaryButton>
            </div>

            {isLoading ? (
                <CenteredLoadingSpinner />
            ) : isError ? (
                <p className="text-center text-red-600">
                    {parseUnknownError(error)}
                </p>
            ) : noData ? (
                <p className="text-center text-gray-500 py-12">
                    {"Немає публікацій"}
                </p>
            ) : (
                <div className="px-8 flow-root">
                    <ul role="list" className="space-y-4">
                        {data.pages.map((page, pageIdx) => (
                            <Fragment key={pageIdx}>
                                {page.data.map((post, postIdx) => (
                                    <SelfPostItem key={postIdx} {...post} />
                                ))}
                            </Fragment>
                        ))}
                    </ul>
                </div>
            )}
        </>
    );
}

CompanyPostsPage.getLayout = CommonLayout;

export const getServerSideProps = protectedSsr({
    allowedRoles: ["Company"],
});
