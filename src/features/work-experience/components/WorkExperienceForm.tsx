import ValidatedInput from "@/components/ui/ValidatedInput";
import { UseWorkExperienceInputs } from "../hooks/use-work-experience-inputs";
import NativeItemSelection from "@/components/ui/NativeItemSelection";
import {
  experienceLevelOptions,
  jobTypeOptions,
  workFormatOptions,
} from "@/lib/enums";
import { MONTH_OPTIONS } from "@/lib/date";

export default function WorkExperienceForm({
  title,
  companyName,
  jobType,
  workFormat,
  experienceLevel,
  startYear,
  startMonth,
  endYear,
  endMonth,
  yearOptions,
  location,
  isRemote,
  isCurrent,
  timePeriodIsInvalid,
}: UseWorkExperienceInputs) {
  const toggleIsRemote = () => {
    isRemote.toggle();
    location.blur();
  };

  return (
    <>
      <div className="grid grid-cols-6 gap-6 mt-4">
        <div className="col-span-6 sm:col-span-6">
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
            value={companyName.value}
            onChange={companyName.change}
            onBlur={companyName.blur}
            warnings={companyName.warnings}
            errors={companyName.errors}
            wasBlurred={companyName.wasBlurred}
            wasChanged={companyName.wasChanged}
          />
        </div>

        <div className="col-span-6 sm:col-span-3">
          <ValidatedInput
            label="Локація"
            id="location"
            value={location.value}
            onChange={location.change}
            onBlur={location.blur}
            warnings={location.warnings}
            errors={location.errors}
            wasBlurred={location.wasBlurred}
            wasChanged={location.wasChanged}
            disabled={isRemote.value}
          />
        </div>
        <div className="col-span-6 sm:col-span-6">
          <div className="flex h-5 items-center">
            <input
              id="isRemote"
              aria-describedby="isRemote"
              name="isRemote"
              type="checkbox"
              checked={isRemote.value}
              onChange={toggleIsRemote}
              className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <label
              htmlFor="isRemote"
              className="ml-3 text-sm font-medium text-gray-700"
            >
              {"Віддалена робота"}
            </label>
          </div>
        </div>
        <div className="col-span-6 sm:col-span-2">
          <NativeItemSelection
            id="job-type"
            label="Тип роботи"
            items={jobTypeOptions}
            selectedItem={jobType.value}
            setSelected={jobType.change}
          />
        </div>
        <div className="col-span-6 sm:col-span-2">
          <NativeItemSelection
            id="work-format"
            label="Формат"
            items={workFormatOptions}
            selectedItem={workFormat.value}
            setSelected={workFormat.change}
          />
        </div>
        <div className="col-span-6 sm:col-span-2">
          <NativeItemSelection
            id="experience-level"
            label="Рівень досвіду"
            items={experienceLevelOptions}
            selectedItem={experienceLevel.value}
            setSelected={experienceLevel.change}
          />
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
            disabled={isCurrent.value}
          />
        </div>
        <div className="col-span-6 sm:col-span-3">
          <NativeItemSelection
            id="end-month"
            label="Місяць закінчення"
            items={MONTH_OPTIONS}
            selectedItem={endMonth.value}
            setSelected={endMonth.change}
            disabled={isCurrent.value}
          />
        </div>
        {timePeriodIsInvalid ? (
          <p className="col-span-6 text-sm text-red-600">
            {"Невалідний проміжок часу"}
          </p>
        ) : null}
        <div className="col-span-6 sm:col-span-6">
          <div className="flex h-5 items-center">
            <input
              id="isCurrent"
              aria-describedby="isCurrentEducation"
              name="isCurrent"
              type="checkbox"
              checked={isCurrent.value}
              onChange={isCurrent.toggle}
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
      </div>
    </>
  );
}
