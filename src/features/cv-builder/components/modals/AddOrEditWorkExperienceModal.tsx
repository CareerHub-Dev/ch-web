import { useCvDataStore } from "../../store/cv-data-store";
import { WorkExperience } from "../../store/cv-data-store/cv";
import { useInput } from "@/hooks/useInput";
import { useObjectInput } from "@/hooks/useObjectInput";
import { useMemo } from "react";
import { useBoolean } from "usehooks-ts";
import NativeItemSelection from "@/components/ui/NativeItemSelection";
import ValidatedInput from "@/components/ui/ValidatedInput";
import AddOrEditItemModal from "./AddOrEditItemModal";
import { MONTH_OPTIONS, getYearOptions } from "@/lib/date";
import getMonth from "date-fns/getMonth";
import {
    jobTypeOptions,
    workFormatOptions,
    experienceLevelOptions,
} from "@/lib/enums";
import { workExperienceToInputs } from "@/lib/work-experience-to-inputs";

const JOB_TYPE_OPTIONS = jobTypeOptions satisfies {
    id: string;
    name: string;
}[];
const WORK_FORMAT_OPTIONS = workFormatOptions satisfies {
    id: string;
    name: string;
}[];
const EXPERIENCE_LEVEL_OPTIONS = experienceLevelOptions satisfies {
    id: string;
    name: string;
}[];

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
    const yearOptions = useMemo(
        () => getYearOptions(MAX_ALLOWED_YEAR_RANGE),
        []
    );
    const initialInputs = useMemo(
        () => workExperienceToInputs(initialPayload?.item),
        [initialPayload]
    );

    const initialStartYear =
        yearOptions.find((item) => item.id === initialInputs.startYear.id) ??
        yearOptions.at(0)!;

    const initialStartMonth =
        MONTH_OPTIONS.find((item) => item.id === initialInputs.startMonth.id) ??
        MONTH_OPTIONS.at(0)!;

    const initialEndYear =
        yearOptions.find((item) => item.id === initialInputs.endYear.id) ??
        yearOptions.at(0)!;

    const initialEndMonth =
        MONTH_OPTIONS.find((item) => item.id === initialInputs.endMonth.id) ??
        MONTH_OPTIONS.at(0)!;

    const jobIsCurrent = useBoolean(initialInputs.isCurrent);

    const title = useInput({
        initialValue: initialInputs.title,
        validators: [fillThisFieldValidator],
    });
    const company = useInput({
        initialValue: initialInputs.companyName,
        validators: [fillThisFieldValidator],
    });
    const isRemote = useBoolean(initialInputs.isRemote);
    const location = useInput({
        initialValue: initialInputs.jobLocation,
        validators: [
            (val) => {
                if (isRemote.value) {
                    return { type: "success" } as const;
                }
                return fillThisFieldValidator(val);
            },
        ],
    });
    const jobType = useObjectInput<{ id: string; name: string }>({
        initialValue: initialInputs.jobType,
    });
    const workFormat = useObjectInput<{ id: string; name: string }>({
        initialValue: initialInputs.workFormat,
    });
    const experienceLevel = useObjectInput<{ id: string; name: string }>({
        initialValue: initialInputs.experienceLevel,
    });
    const startYear = useObjectInput({
        initialValue: initialStartYear,
    });
    const startMonth = useObjectInput({
        initialValue: initialStartMonth,
    });
    const endYear = useObjectInput({
        initialValue: initialEndYear,
    });
    const endMonth = useObjectInput({
        initialValue: initialEndMonth,
    });
    const startYearInt = Number(startYear.value.id);
    const endYearInt = Number(endYear.value.id);
    const startMonthInt = Number(startMonth.value.id) - 1;
    const endMonthInt = Number(endMonth.value.id) - 1;
    const today = new Date();
    const currentYear = today.getFullYear();
    const currentMonth = getMonth(today);

    const timePeriodIsInvalid =
        (!jobIsCurrent.value &&
            (startYearInt > endYearInt ||
                (startYearInt === endYearInt &&
                    startMonthInt > endMonthInt))) ||
        startYearInt > currentYear ||
        (startYearInt === currentYear && startMonthInt > currentMonth);

    const allInputs = [
        title,
        company,
        location,
        jobType,
        workFormat,
        experienceLevel,
        startYear,
        startMonth,
        endYear,
        endMonth,
    ];
    const thereAreSomeErrors =
        allInputs.some((item) => item.errors.length > 0) || timePeriodIsInvalid;

    const formType = !initialPayload ? "add" : "edit";

    const handleIsRemoteChange = () => {
        isRemote.toggle();
        location.blur();
    };

    const handleConfirm = () => {
        if (thereAreSomeErrors) return;
        const startDate = new Date(startYearInt, startMonthInt).toUTCString();
        const endDate = jobIsCurrent.value
            ? null
            : new Date(endYearInt, endMonthInt).toUTCString();

        const values = {
            title: title.value,
            companyName: company.value,
            jobLocation: location.value,
            jobType: jobType.value.id,
            workFormat: workFormat.value.id,
            experienceLevel: experienceLevel.value.id,
            startDate,
            endDate,
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
                        value={company.value}
                        onChange={company.change}
                        onBlur={company.blur}
                        warnings={company.warnings}
                        errors={company.errors}
                        wasBlurred={company.wasBlurred}
                        wasChanged={company.wasChanged}
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
                            onChange={handleIsRemoteChange}
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
                        items={JOB_TYPE_OPTIONS}
                        selectedItem={jobType.value}
                        setSelected={jobType.change}
                    />
                </div>
                <div className="col-span-6 sm:col-span-2">
                    <NativeItemSelection
                        id="work-format"
                        label="Формат"
                        items={WORK_FORMAT_OPTIONS}
                        selectedItem={workFormat.value}
                        setSelected={workFormat.change}
                    />
                </div>
                <div className="col-span-6 sm:col-span-2">
                    <NativeItemSelection
                        id="experience-level"
                        label="Рівень досвіду"
                        items={EXPERIENCE_LEVEL_OPTIONS}
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
            </div>
        </AddOrEditItemModal>
    );
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
