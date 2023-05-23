import useToast from "@/hooks/useToast";
import { useInput } from "@/hooks/useInput";
import useProtectedMutation from "@/hooks/useProtectedMutation";
import { createJobOffer } from "@/lib/api/job-offer";
import parseUnknownError from "@/lib/parse-unknown-error";
import { FormEventHandler } from "react";
import MarkdownEditor from "../markdown-editor/MarkdownEditor";
import { deriveConfig } from "../markdown-editor/config";
import { PhotoIcon } from "@heroicons/react/24/solid";
import { useBoolean } from "usehooks-ts";
import { fillThisFieldValidator } from "@/lib/util";
import SecondaryButton from "@/components/ui/SecondaryButton";
import RemovePhotoModal from "./RemovePhotoModal";
import Image from "next/image";
import { useImageUpload } from "@/hooks/useImageUpload";
import ChangePhotoModal from "./ChangePhotoModal";
import ValidatedInput from "@/components/ui/ValidatedInput";
import ValidatedTextArea from "@/components/ui/ValidatedTextArea";
import ItemSelection from "@/components/ui/ItemsSelection";
import {
    experienceLevelOptions,
    jobTypeOptions,
    workFormatOptions,
} from "@/lib/enums";
import { useObjectInput } from "@/hooks/useObjectInput";
import { useDatepicker } from "@/hooks/useDatepicker";
import DateInput from "@/components/ui/DateInput";
import { useJobDirectionsQuery } from "@/hooks/requests/job-directions";
import { useJobPositionsByJobDirectionQuery } from "@/hooks/requests/job-directions";
import ItemSelectionLoadingSkeleton from "@/components/ui/ItemsSelectionLoadingSkeleton";
import DisabledItemsSelection from "@/components/ui/DisabledItemsSelection";
import LargeBadge from "@/components/ui/LargeBadge";
import useTagIds from "./use-tag-ids";
import QueryAutoCompleteCombobox from "@/components/ui/QueryAutocompleteCombobox";
import useEditor from "@/hooks/useEditor";
import { getTags } from "@/lib/api/tags";

const editorConfig = deriveConfig("overview");

export default function JobOfferForm() {
    const toast = useToast();
    const {
        data: jobDirections,
        isLoading: isLoadingJobDirections,
        isError: isErrorJobDirections,
        error: errorJobDirections,
    } = useJobDirectionsQuery({
        onSuccess: (data) => {
            if (selectedJobDirection.value.id !== "0") {
                return;
            }

            const first = data.at(0);
            if (first !== undefined) {
                selectedJobDirection.change(first);
            }
        },
    });
    const selectedJobDirection = useObjectInput({
        initialValue: jobDirections?.at(0) ?? { id: "0", name: "Не обрано" },
    });
    const {
        data: jobPositions,
        isLoading: isLoadingJobPositions,
        isError: isErrorJobPositions,
        error: errorJobPositions,
    } = useJobPositionsByJobDirectionQuery(selectedJobDirection.value.id, {
        enabled: selectedJobDirection.value.id !== "0",
        onSuccess: (data) => {
            if (selectedJobDirection.value.id !== "0") {
                return;
            }

            const first = data.at(0);
            if (first !== undefined) {
                selectedJobPosition.change(first);
            }
        },
    });
    const selectedJobPosition = useObjectInput({
        initialValue: jobPositions?.at(0) ?? { id: "0", name: "Не обрано" },
    });
    const changePhotoModalIsOpen = useBoolean(false);
    const removePhotoModalIsOpen = useBoolean(false);
    const resetValuesModalIsOpen = useBoolean(false);

    const titleInput = useInput({
        validators: [fillThisFieldValidator("Заповніть це поле")],
    });
    const overviewEditor = useEditor([]);
    const photo = useImageUpload();
    const requirementsInput = useInput({
        validators: [fillThisFieldValidator("Заповніть це поле")],
    });
    const responsibilitiesInput = useInput({
        validators: [fillThisFieldValidator("Заповніть це поле")],
    });
    const additionalInfoInput = useInput({
        validators: [fillThisFieldValidator("Заповніть це поле")],
    });
    const jobType = useObjectInput({
        initialValue: jobTypeOptions.at(0)!,
    });
    const workFormat = useObjectInput({
        initialValue: workFormatOptions.at(0)!,
    });
    const experienceLevel = useObjectInput({
        initialValue: experienceLevelOptions.at(0)!,
    });
    const { startDate, endDate } = useDatepicker(30);
    const tags = useTagIds();

    const allInputs = [
        titleInput,
        requirementsInput,
        responsibilitiesInput,
        additionalInfoInput,
        startDate,
        endDate,
    ];

    const someInputIsInvalid = allInputs.some(
        (input) => input.errors.length > 0
    );

    const submitMutation = useProtectedMutation(
        ["job-offer-form"],
        createJobOffer,
        {
            onMutate: () => {
                toast.setCurrent("Створення вакансії...");
            },
            onError: (err) => {
                toast.error(parseUnknownError(err), true);
            },
            onSuccess: () => {
                toast.success(`Вакансію ${titleInput.value} створено`, true);
            },
        }
    );

    const handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
        event.preventDefault();
        allInputs.forEach((input) => input.blur());
        overviewEditor.blur();
        const { hasErrors: overviewEditorHasErrors } =
            overviewEditor.validate();
        if (someInputIsInvalid || overviewEditorHasErrors) {
            return;
        }
        const requestBody = {
            title: titleInput.value,
            overview: overviewEditor.textRef.current,
            requirements: requirementsInput.value,
            responsibilities: responsibilitiesInput.value,
            preferences: additionalInfoInput.value,
            image: photo.data?.croppedPhotoUrl,
            jobType: jobType.value.id,
            workFormat: workFormat.value.id,
            experienceLevel: experienceLevel.value.id,
            startDate: startDate.value.toISOString(),
            endDate: endDate.value.toISOString(),
            jobPositionId: selectedJobPosition.value.id,
            tagIds: tags.tagIds,
        } satisfies JobOfferForm.JobOffer;
        submitMutation.mutate(requestBody);
    };

    return (
        <>
            <ChangePhotoModal
                show={changePhotoModalIsOpen.value}
                onConfirm={photo.load}
                onClose={changePhotoModalIsOpen.setFalse}
            />
            <RemovePhotoModal
                show={removePhotoModalIsOpen.value}
                onConfirm={photo.reset}
                onClose={removePhotoModalIsOpen.setFalse}
            />

            <form className="p-8 mb-12" onSubmit={handleSubmit}>
                <div className="space-y-12">
                    <div className="border-b border-gray-900/10 pb-12">
                        <h2 className="text-base font-semibold leading-7 text-gray-900">
                            {"Додання вакансії"}
                        </h2>
                        <p className="mt-1 text-sm leading-6 text-gray-600">
                            {
                                "Після відправки цієї форми вакансію буде опубліковано, але ви зможете її редагувати."
                            }
                        </p>

                        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                            <div className="sm:col-span-4">
                                <label
                                    htmlFor="title"
                                    className="block text-sm font-medium leading-6 text-gray-900"
                                >
                                    {"Назва вакансії"}
                                </label>
                                <div className="mt-2">
                                    <ValidatedInput
                                        id="title"
                                        name="title"
                                        {...titleInput}
                                        onChange={titleInput.change}
                                        onBlur={titleInput.blur}
                                        placeholder="Trainee Python Developer"
                                    />
                                </div>
                            </div>

                            <div className="col-span-full">
                                <label
                                    htmlFor="overview"
                                    className="block text-sm font-medium leading-6 text-gray-900"
                                >
                                    {"Огляд"}
                                </label>
                                <div className="mt-2">
                                    <MarkdownEditor
                                        id="overview"
                                        config={editorConfig}
                                        textRef={overviewEditor.textRef}
                                        onBlur={overviewEditor.blur}
                                    />
                                </div>
                                <p className="mt-3 text-sm leading-6 text-gray-600">
                                    {"Загальна інформація про вакансію"}
                                </p>
                            </div>

                            <div className="col-span-full">
                                <label
                                    htmlFor="photo"
                                    className="block text-sm font-medium leading-6 text-gray-900"
                                >
                                    {"Фото"}
                                </label>
                                <div className="mt-2 flex items-center gap-x-3">
                                    {photo.data === undefined ? (
                                        <PhotoIcon
                                            className="h-24 w-24 text-gray-300"
                                            aria-hidden="true"
                                        />
                                    ) : (
                                        <Image
                                            src={photo.data.croppedPhotoUrl}
                                            width={96}
                                            height={96}
                                            className="rounded-md h-24 w-24"
                                            alt="Фото"
                                        />
                                    )}
                                    <SecondaryButton
                                        type="button"
                                        onClick={changePhotoModalIsOpen.setTrue}
                                    >
                                        {"Замінити"}
                                    </SecondaryButton>
                                    {photo.data !== undefined ? (
                                        <SecondaryButton
                                            type="button"
                                            onClick={
                                                removePhotoModalIsOpen.setTrue
                                            }
                                        >
                                            {"Видалити"}
                                        </SecondaryButton>
                                    ) : null}
                                </div>
                                <p className="mt-3 text-sm leading-6 text-gray-600">
                                    {"Фото є опціональним"}
                                </p>
                            </div>

                            <div className="col-span-full md:col-span-3">
                                <label
                                    htmlFor="requirements"
                                    className="block text-sm font-medium leading-6 text-gray-900"
                                >
                                    {"Вимоги"}
                                </label>
                                <div className="mt-2 sm:col-span-3">
                                    <ValidatedTextArea
                                        {...requirementsInput}
                                        onChange={requirementsInput.change}
                                        onBlur={requirementsInput.blur}
                                        id="requirements"
                                    />
                                </div>
                            </div>

                            <div className="col-span-full md:col-span-3">
                                <label
                                    htmlFor="responsibilities"
                                    className="block text-sm font-medium leading-6 text-gray-900"
                                >
                                    {"Обов'язки"}
                                </label>
                                <div className="mt-2">
                                    <ValidatedTextArea
                                        {...responsibilitiesInput}
                                        onChange={responsibilitiesInput.change}
                                        onBlur={responsibilitiesInput.blur}
                                        id="responsibilities"
                                    />
                                </div>
                            </div>

                            <div className="col-span-full">
                                <label
                                    htmlFor="additional"
                                    className="block text-sm font-medium leading-6 text-gray-900"
                                >
                                    {"Додатково"}
                                </label>
                                <div className="mt-2">
                                    <ValidatedTextArea
                                        {...additionalInfoInput}
                                        onChange={additionalInfoInput.change}
                                        onBlur={additionalInfoInput.blur}
                                        id="additional"
                                    />
                                </div>
                            </div>

                            <div className="sm:col-span-2">
                                <label
                                    htmlFor="jobType"
                                    className="block text-sm font-medium leading-6 text-gray-900"
                                >
                                    {"Тип роботи"}
                                </label>
                                <div className="mt-2">
                                    <ItemSelection
                                        items={jobTypeOptions}
                                        selectedItem={jobType.value}
                                        setSelected={jobType.change}
                                        errors={jobType.errors}
                                        warnings={jobType.warnings}
                                    />
                                </div>
                            </div>

                            <div className="sm:col-span-2">
                                <label
                                    htmlFor="workFormat"
                                    className="block text-sm font-medium leading-6 text-gray-900"
                                >
                                    {"Формат"}
                                </label>
                                <div className="mt-2">
                                    <ItemSelection
                                        items={workFormatOptions}
                                        selectedItem={workFormat.value}
                                        setSelected={workFormat.change}
                                        errors={workFormat.errors}
                                        warnings={workFormat.warnings}
                                    />
                                </div>
                            </div>

                            <div className="sm:col-span-2">
                                <label
                                    htmlFor="experienceLevel"
                                    className="block text-sm font-medium leading-6 text-gray-900"
                                >
                                    {"Рівень досвіду"}
                                </label>
                                <div className="mt-2">
                                    <ItemSelection
                                        items={experienceLevelOptions}
                                        selectedItem={experienceLevel.value}
                                        setSelected={experienceLevel.change}
                                        errors={experienceLevel.errors}
                                        warnings={experienceLevel.warnings}
                                    />
                                </div>
                            </div>

                            <div className="sm:col-span-3">
                                <label
                                    htmlFor="startDate"
                                    className="block text-sm font-medium leading-6 text-gray-900"
                                >
                                    {"Дата початку"}
                                </label>
                                <div className="mt-2">
                                    <DateInput id="startDate" {...startDate} />
                                </div>
                            </div>

                            <div className="sm:col-span-3">
                                <label
                                    htmlFor="endDate"
                                    className="block text-sm font-medium leading-6 text-gray-900"
                                >
                                    {"Дата закінчення"}
                                </label>
                                <div className="mt-2">
                                    <DateInput id="endDate" {...endDate} />
                                </div>
                            </div>

                            <div className="sm:col-span-3">
                                <label
                                    htmlFor="jobDirection"
                                    className="block text-sm font-medium leading-6 text-gray-900"
                                >
                                    {"Напрямок"}
                                </label>
                                <div className="mt-2">
                                    {isLoadingJobDirections ? (
                                        <ItemSelectionLoadingSkeleton />
                                    ) : isErrorJobDirections ? (
                                        <p>
                                            {parseUnknownError(
                                                errorJobDirections
                                            )}
                                        </p>
                                    ) : (
                                        <ItemSelection
                                            items={jobDirections}
                                            selectedItem={
                                                selectedJobDirection.value
                                            }
                                            setSelected={
                                                selectedJobDirection.change
                                            }
                                            errors={selectedJobDirection.errors}
                                            warnings={
                                                selectedJobDirection.warnings
                                            }
                                        />
                                    )}
                                </div>
                            </div>

                            <div className="sm:col-span-3">
                                <label
                                    htmlFor="jobPosition"
                                    className="block text-sm font-medium leading-6 text-gray-900"
                                >
                                    {"Посада"}
                                </label>
                                <div className="mt-2">
                                    {selectedJobDirection.value.id === "0" ? (
                                        <DisabledItemsSelection text="Оберіть напрямок" />
                                    ) : isLoadingJobPositions ? (
                                        <ItemSelectionLoadingSkeleton />
                                    ) : isErrorJobPositions ? (
                                        <p>
                                            {parseUnknownError(
                                                errorJobPositions
                                            )}
                                        </p>
                                    ) : (
                                        <ItemSelection
                                            items={jobPositions}
                                            selectedItem={
                                                selectedJobPosition.value
                                            }
                                            setSelected={
                                                selectedJobPosition.change
                                            }
                                            errors={selectedJobPosition.errors}
                                            warnings={
                                                selectedJobPosition.warnings
                                            }
                                        />
                                    )}
                                </div>
                            </div>

                            <div className="col-span-full">
                                <QueryAutoCompleteCombobox
                                    onSubmit={tags.add}
                                    getItemName={(item) => item.name}
                                    queryKey={"tags"}
                                    queryFn={getTags}
                                    label="Теги"
                                />
                                <div className="mt-2">
                                    <ul className="flex gap-4 flex-wrap">
                                        {tags.tags.length === 0 ? (
                                            <p className="text-gray-700 text-center">
                                                {"Немає тегів"}
                                            </p>
                                        ) : (
                                            tags.tags.map((item, itemIdx) => (
                                                <LargeBadge
                                                    key={itemIdx}
                                                    name={item.name}
                                                    onRemove={() =>
                                                        tags.remove(item)
                                                    }
                                                />
                                            ))
                                        )}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-6 flex items-center justify-end gap-x-6">
                    <button
                        type="button"
                        onClick={resetValuesModalIsOpen.setTrue}
                        className="text-sm font-semibold leading-6 text-gray-900"
                    >
                        {"Відмінити"}
                    </button>
                    <button
                        type="submit"
                        className="inline-flex justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                    >
                        {"Додати"}
                    </button>
                </div>
            </form>
        </>
    );
}
