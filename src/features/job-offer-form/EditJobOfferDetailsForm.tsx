import useToast from "@/hooks/useToast";
import { useInput } from "@/hooks/useInput";
import useProtectedMutation from "@/hooks/useProtectedMutation";
import { updateJobOffer } from "@/lib/api/job-offer";
import parseUnknownError from "@/lib/parse-unknown-error";
import { FormEventHandler, useMemo } from "react";
import MarkdownEditor from "../markdown-editor/MarkdownEditor";
import { deriveConfig } from "../markdown-editor/config";
import { fillThisFieldValidator } from "@/lib/util";
import ValidatedInput from "@/components/ui/ValidatedInput";
import ValidatedTextArea from "@/components/ui/ValidatedTextArea";
import ItemSelection from "@/components/ui/ItemsSelection";
import {
  experienceLevelOptions,
  jobTypeOptions,
  matchExperienceLevel,
  matchJobType,
  matchWorkFormat,
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
import { JobOfferDetails } from "@/lib/api/job-offer/schemas";

export default function EditJobOfferDetailsForm({
  id: jobOfferId,
  jobPosition,
  jobDirection,
  title,
  overview,
  requirements,
  responsibilities,
  preferences,
  jobType,
  tags,
  workFormat,
  experienceLevel,
  startDate,
  endDate,
}: JobOfferDetails) {
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
    initialValue: jobDirection,
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
    initialValue: jobPosition,
  });
  const titleInput = useInput({
    initialValue: title,
    validators: [fillThisFieldValidator("Заповніть це поле")],
  });
  const overviewEditorConfig = useMemo(
    () => deriveConfig("overview", overview),
    [overview]
  );
  const overviewEditor = useEditor([]);
  const requirementsInput = useInput({
    initialValue: requirements,
    validators: [fillThisFieldValidator("Заповніть це поле")],
  });
  const responsibilitiesInput = useInput({
    initialValue: responsibilities,
    validators: [fillThisFieldValidator("Заповніть це поле")],
  });
  const additionalInfoInput = useInput({
    initialValue: preferences,
    validators: [fillThisFieldValidator("Заповніть це поле")],
  });
  const jobTypeInput = useObjectInput({
    initialValue: matchJobType(jobType),
  });
  const workFormatInput = useObjectInput({
    initialValue: matchWorkFormat(workFormat),
  });
  const experienceLevelInput = useObjectInput({
    initialValue: matchExperienceLevel(experienceLevel),
  });

  const initialStartDate = useMemo(() => new Date(startDate), [startDate]);
  const initialEndDate = useMemo(() => new Date(endDate), [endDate]);
  const { startDate: startDateInput, endDate: endDateInput } = useDatepicker({
    initialStartDate,
    initialEndDate,
    daysBarrier: 60,
  });
  const tagsInput = useTagIds(tags);

  const allInputs = [
    titleInput,
    requirementsInput,
    responsibilitiesInput,
    additionalInfoInput,
    startDateInput,
    endDateInput,
  ];

  const someInputIsInvalid = allInputs.some((input) => input.errors.length > 0);

  const submitMutation = useProtectedMutation(
    ["job-offer-details-edit", jobOfferId],
    updateJobOffer,
    {
      onMutate: (variables) => {
        toast.setCurrent(`Оновлюємо вакансію ${variables.title}`);
      },
      onError: (err) => {
        toast.error(parseUnknownError(err), true);
      },
      onSuccess: (_data, variables) => {
        toast.success(`Вакансію ${variables.title} оновлено`, true);
      },
    }
  );

  const handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    allInputs.forEach((input) => input.blur());
    overviewEditor.blur();
    console.log(overviewEditor.textRef.current);
    
    const { hasErrors: overviewEditorHasErrors } = overviewEditor.validate();
    if (someInputIsInvalid || overviewEditorHasErrors) {
      return;
    }
    const requestBody = {
      jobOfferId,
      title: titleInput.value,
      overview: overviewEditor.textRef.current,
      requirements: requirementsInput.value,
      responsibilities: responsibilitiesInput.value,
      preferences: additionalInfoInput.value,
      jobType: jobTypeInput.value.id,
      workFormat: workFormatInput.value.id,
      experienceLevel: experienceLevelInput.value.id,
      startDate: startDateInput.value.toISOString(),
      endDate: endDateInput.value.toISOString(),
      jobPositionId: selectedJobPosition.value.id,
      tagIds: tagsInput.tagIds,
    } satisfies Omit<JobOfferForm.JobOffer, "image"> & { jobOfferId: string };
    submitMutation.mutate(requestBody);
  };

  return (
    <>
      <form className="p-8 mb-12" onSubmit={handleSubmit}>
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12">
            <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
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
                    config={overviewEditorConfig}
                    textRef={overviewEditor.textRef}
                    onBlur={overviewEditor.blur}
                  />
                </div>
                <p className="mt-3 text-sm leading-6 text-gray-600">
                  {"Загальна інформація про вакансію"}
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
                    selectedItem={jobTypeInput.value}
                    setSelected={jobTypeInput.change}
                    errors={jobTypeInput.errors}
                    warnings={jobTypeInput.warnings}
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
                    selectedItem={workFormatInput.value}
                    setSelected={workFormatInput.change}
                    errors={workFormatInput.errors}
                    warnings={workFormatInput.warnings}
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
                    selectedItem={experienceLevelInput.value}
                    setSelected={experienceLevelInput.change}
                    errors={experienceLevelInput.errors}
                    warnings={experienceLevelInput.warnings}
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
                  <DateInput id="startDate" {...startDateInput} />
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
                  <DateInput id="endDate" {...endDateInput} />
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
                    <p>{parseUnknownError(errorJobDirections)}</p>
                  ) : (
                    <ItemSelection
                      items={jobDirections}
                      selectedItem={selectedJobDirection.value}
                      setSelected={selectedJobDirection.change}
                      errors={selectedJobDirection.errors}
                      warnings={selectedJobDirection.warnings}
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
                    <p>{parseUnknownError(errorJobPositions)}</p>
                  ) : (
                    <ItemSelection
                      items={jobPositions}
                      selectedItem={selectedJobPosition.value}
                      setSelected={selectedJobPosition.change}
                      errors={selectedJobPosition.errors}
                      warnings={selectedJobPosition.warnings}
                    />
                  )}
                </div>
              </div>

              <div className="col-span-full">
                <QueryAutoCompleteCombobox
                  onSubmit={tagsInput.add}
                  getItemName={(item) => item.name}
                  queryKey={"tags"}
                  queryFn={getTags}
                  label="Теги"
                />
                <div className="mt-2">
                  <ul className="flex gap-4 flex-wrap">
                    {tagsInput.tags.length === 0 ? (
                      <p className="text-gray-700 text-center">
                        {"Немає тегів"}
                      </p>
                    ) : (
                      tagsInput.tags.map((item, itemIdx) => (
                        <LargeBadge
                          key={itemIdx}
                          name={item.name}
                          onRemove={() => tagsInput.remove(item)}
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
            type="submit"
            className="inline-flex justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
          >
            {"Зберегти"}
          </button>
        </div>
      </form>
    </>
  );
}
