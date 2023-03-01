import { useCvDataStore } from "../../store/cv-data-store";
import { type WorkExperience } from "../../store/cv-data-store/cv";
import { useInput } from "@/hooks/useInput";
import { useObjectInput } from "@/hooks/useObjectInput";
import { useMemo } from "react";
import { useBoolean } from "usehooks-ts";
import NativeItemSelection from "@/components/ui/NativeItemSelection";
import ValidatedInput from "@/components/ui/ValidatedInput";
import AddOrEditItemModal from "./AddOrEditItemModal";
import ValidatedTextArea from "../ValidatedTextArea";

export default function AddOrEditWorkExperienceModal({
  onClose,
  initialPayload,
}: {
  onClose: () => void;
  initialPayload?: { item: WorkExperience; itemIndex: number };
}) {
  const dispatchWorkExperiences = useCvDataStore(
    (s) => s.dispatchWorkExperiences
  );
  const yearOptions = useMemo(() => getYearOptions(MAX_ALLOWED_YEAR_RANGE), []);
  const jobIsCurrent = useBoolean(true);

  const title = useInput({
    initialValue: initialPayload?.item.title ?? "",
    validators: [fillThisFieldValidator],
  });
  const company = useInput({
    initialValue: initialPayload?.item.company ?? "",
    validators: [fillThisFieldValidator],
  });
  const description = useInput({
    initialValue: initialPayload?.item.company ?? "",
    validators: [fillThisFieldValidator],
  });
  const startYear = useObjectInput({
    initialValue:
      yearOptions.find((item) => item.id === initialPayload?.item.startYear) ??
      yearOptions.at(0)!,
  });
  const startMonth = useObjectInput({
    initialValue:
      MONTH_OPTIONS.find(
        (item) => item.id === initialPayload?.item.startMonth
      ) ?? MONTH_OPTIONS.at(0)!,
  });
  const endYear = useObjectInput({
    initialValue:
      yearOptions.find((item) => item.id === initialPayload?.item.endYear) ??
      yearOptions.at(0)!,
  });
  const endMonth = useObjectInput({
    initialValue:
      MONTH_OPTIONS.find((item) => item.id === initialPayload?.item.endMonth) ??
      MONTH_OPTIONS.at(0)!,
  });
  const startYearInt = Number(startYear.value.name);
  const endYearInt = Number(endYear.value.name);
  const startMonthInt = Number(startMonth.value.id);
  const endMonthInt = Number(endMonth.value.id);
  const today = new Date();
  const currentYear = today.getFullYear();
  const currentMonth = today.getMonth() + 1;

  const timePeriodIsInvalid =
    (!jobIsCurrent.value &&
      (startYearInt > endYearInt ||
        (startYearInt === endYearInt && startMonthInt > endMonthInt))) ||
    startYearInt > currentYear ||
    (startYearInt === currentYear && startMonthInt > currentMonth);

  const allInputs = [
    title,
    company,
    description,
    startYear,
    startMonth,
    endYear,
    endMonth,
  ];
  const thereAreSomeErrors =
    allInputs.some((item) => item.errors.length > 0) || timePeriodIsInvalid;

  const formType = !initialPayload ? "add" : "edit";

  const handleConfirm = () => {
    if (thereAreSomeErrors) return;

    const values = {
      title: title.value,
      company: company.value,
      startYear: startYear.value.id,
      startMonth: startMonth.value.id,
      endYear: endYear.value.id,
      endMonth: endMonth.value.id,
      description: description.value,
      isCurrent: jobIsCurrent.value,
    };

    if (!initialPayload) {
      dispatchWorkExperiences({
        type: "add",
        item: values,
      });
    } else {
      dispatchWorkExperiences({
        type: "edit",
        itemIndex: initialPayload.itemIndex,
        newValue: values,
      });
    }
    onClose();
  };

  return (
    <AddOrEditItemModal
      onClose={onClose}
      onConfirm={handleConfirm}
      type={formType}
      confirmationDisabled={thereAreSomeErrors}
    >
      <div className="grid grid-cols-6 gap-6 mt-4">
        <div className="col-span-6 sm:col-span-3">
          <ValidatedInput
            label="Посада"
            id="title"
            value={title.value}
            onChange={title.change}
            onBlur={title.blur}
            warnings={title.warnings}
            errors={title.errors}
            wasBlurred={title.wasBlurred}
            wasChanged={title.wasChanged}
          />
        </div>

        <div className="col-span-6 sm:col-span-3">
          <ValidatedInput
            label="Компанія"
            id="company"
            value={company.value}
            onChange={company.change}
            onBlur={company.blur}
            warnings={company.warnings}
            errors={company.errors}
            wasBlurred={company.wasBlurred}
            wasChanged={company.wasChanged}
          />
        </div>

        <div className="col-span-6">
          <label
            htmlFor={"description"}
            className="block sm:text-sm font-medium text-gray-700 mb-1"
          >
            {"Опис"}
          </label>

          <ValidatedTextArea
            id="description"
            value={description.value}
            onChange={description.change}
            onBlur={description.blur}
            warnings={description.warnings}
            errors={description.errors}
            wasBlurred={description.wasBlurred}
            wasChanged={description.wasChanged}
          />
        </div>

        <div className="col-span-6 sm:col-span-6">
          <div className="flex h-5 items-center">
            <input
              id="isCurrent"
              aria-describedby="isCurrentEducation"
              name="isCurrent"
              type="checkbox"
              checked={jobIsCurrent.value}
              onChange={jobIsCurrent.toggle}
              className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <label
              htmlFor="isCurrent"
              className="ml-3 text-sm font-medium text-gray-700"
            >
              Це моя поточна посада
            </label>
          </div>
        </div>

        <div className="col-span-6 sm:col-span-3">
          <NativeItemSelection
            id="start-year"
            label="Рік початку"
            items={yearOptions}
            selectedItem={startYear.value}
            setSelected={startYear.change}
          />
        </div>
        <div className="col-span-6 sm:col-span-3">
          <NativeItemSelection
            id="start-month"
            label="Місяць початку"
            items={MONTH_OPTIONS}
            selectedItem={startMonth.value}
            setSelected={startMonth.change}
          />
        </div>

        <div className="col-span-6 sm:col-span-3">
          <NativeItemSelection
            id="end-year"
            label="Рік закінчення"
            items={yearOptions}
            selectedItem={endYear.value}
            setSelected={endYear.change}
            disabled={jobIsCurrent.value}
          />
        </div>
        <div className="col-span-6 sm:col-span-3">
          <NativeItemSelection
            id="end-month"
            label="Місяць закінчення"
            items={MONTH_OPTIONS}
            selectedItem={endMonth.value}
            setSelected={endMonth.change}
            disabled={jobIsCurrent.value}
          />
        </div>
        {timePeriodIsInvalid ? (
          <p className="col-span-6 text-sm text-red-600">
            {"Невалідний проміжок часу"}
          </p>
        ) : null}
      </div>
    </AddOrEditItemModal>
  );
}

const MONTH_OPTIONS = [
  { id: "01", name: "Січень (01)" },
  { id: "02", name: "Лютий (02)" },
  { id: "03", name: "Березень (03)" },
  { id: "04", name: "Квітень (04)" },
  { id: "05", name: "Травень (05)" },
  { id: "06", name: "Червень (06)" },
  { id: "07", name: "Липень (07)" },
  { id: "08", name: "Серпень (08)" },
  { id: "09", name: "Вересень (09)" },
  { id: "10", name: "Жовтень (10)" },
  { id: "11", name: "Листопад (11)" },
  { id: "12", name: "Грудень (12)" },
];

function getYearOptions(range: number) {
  const currentYear = new Date().getFullYear();
  const yearOptions = Array.from(Array(range).keys()).map((item) => {
    const year = (currentYear - item).toString();
    return {
      id: year,
      name: year,
    };
  });
  return yearOptions;
}

function fillThisFieldValidator(val: string) {
  return val.length > 0
    ? ({ type: "success" } as const)
    : ({
        type: "error",
        message: "Це обов'язкове поле",
      } as const);
}
const MAX_ALLOWED_YEAR_RANGE = 50;
