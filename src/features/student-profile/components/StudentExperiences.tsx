import { Fragment } from "react";
import { useProtectedPaginatedQuery } from "@/hooks/useProtectedPaginatedQuery";
import { getStudentExperiences } from "@/lib/api/student";
import StudentStatSkeleton from "./StudentStatSkeleton";
import StudentExperience from "./StudentExperience";
import parseUnknownError from "@/lib/parse-unknown-error";
import AddExperienceButton from "./AddExperienceButton";
import { useDialogActionsPaginatedListReducer } from "@/hooks/useDialogActionsListReducer";
import { Experience } from "@/lib/api/student/schemas";
import DialogWithBackdrop from "@/components/ui/dialog/DialogWithBackdrop";
import EditExperienceForm from "./EditExperienceForm";
import DeleteExperienceForm from "./DeleteExperienceForm";

export default function StudentExperiences({
    accountId,
    isSelf,
}: {
    accountId: string;
    isSelf: boolean;
}) {
    const { data, isLoading, isError, error } = useProtectedPaginatedQuery({
        queryKey: ["student-experiences", isSelf ? "self" : accountId],
        getItems: getStudentExperiences,
        params: { accountId, page: 1, pageSize: 36 },
    });

    const { state, dispatch } =
        useDialogActionsPaginatedListReducer<Experience>();
    const { dialog, focusedItem } = state;

    const handleEditClick = (
        item: Experience,
        itemIndex: number,
        pageIndex: number
    ) =>
        dispatch({
            type: "edit",
            item,
            itemIndex,
            pageIndex,
        });

    const handleRemoveClick = (
        item: Experience,
        itemIndex: number,
        pageIndex: number
    ) =>
        dispatch({
            type: "remove",
            item,
            itemIndex,
            pageIndex,
        });

    const handleDialogClose = () =>
        dispatch({
            type: "close",
        });

    return (
        <section aria-labelledby="student-working-experience">
            <DialogWithBackdrop
                title={"Видалити"}
                onClose={handleDialogClose}
                show={dialog === "remove"}
            >
                <DeleteExperienceForm
                    id={focusedItem?.id ?? ""}
                    title={focusedItem?.title ?? ""}
                    onCancel={handleDialogClose}
                    onSuccess={handleDialogClose}
                />
            </DialogWithBackdrop>
            <DialogWithBackdrop
                title={"Редагувати"}
                onClose={handleDialogClose}
                show={dialog === "edit"}
            >
                <EditExperienceForm
                    updatedItem={focusedItem || undefined}
                    onCancel={handleDialogClose}
                    onSuccess={handleDialogClose}
                />
            </DialogWithBackdrop>
            <div className="bg-white shadow sm:rounded-lg">
                <div className="flex min-w-0 flex-1 justify-between space-x-4 px-4 py-5 sm:px-6">
                    <h2
                        id="student-information-title"
                        className="text-lg font-medium leading-6 text-gray-900"
                    >
                        {"Досвід роботи"}
                    </h2>
                    {isSelf ? <AddExperienceButton /> : null}
                </div>
                <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
                    <ul className="grid grid-cols-1 gap-5">
                        {isLoading ? (
                            Array.from({ length: 3 }).map((_, index) => (
                                <StudentStatSkeleton key={index} />
                            ))
                        ) : isError ? (
                            <p className="text-center text-red-500">
                                {parseUnknownError(error)}
                            </p>
                        ) : data.pages.at(0)?.data.length === 0 ? (
                            <p className="text-center text-gray-500">
                                {"Немає досвіду роботи"}
                            </p>
                        ) : (
                            data.pages.map((page, pageIdx) => (
                                <Fragment key={pageIdx}>
                                    {page.data.map(
                                        (experience, experienceIdx) => (
                                            <StudentExperience
                                                isSelf={isSelf}
                                                onEditClick={() =>
                                                    handleEditClick(
                                                        experience,
                                                        experienceIdx,
                                                        pageIdx
                                                    )
                                                }
                                                onRemoveClick={() =>
                                                    handleRemoveClick(
                                                        experience,
                                                        experienceIdx,
                                                        pageIdx
                                                    )
                                                }
                                                key={experience.id}
                                                {...experience}
                                            />
                                        )
                                    )}
                                </Fragment>
                            ))
                        )}
                    </ul>
                </div>
            </div>
        </section>
    );
}
