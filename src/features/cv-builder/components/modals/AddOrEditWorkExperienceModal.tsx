import { useCvDataStore } from "../../store/cv-data-store";
import { WorkExperience } from "../../store/cv-data-store/cv";
import { useInput } from "@/hooks/useInput";
import { useObjectInput } from "@/hooks/useObjectInput";
import { useMemo } from "react";
import { useBoolean } from "usehooks-ts";
import NativeItemSelection from "@/components/ui/NativeItemSelection";
import ValidatedInput from "@/components/ui/ValidatedInput";
import AddOrEditItemModal from "./AddOrEditItemModal";
import { MONTH_OPTIONS, getYearOptions } from "@/lib/util";
import getMonth from "date-fns/getMonth";
import {
    jobTypeOptions,
    workFormatOptions,
    experienceLevelOptions,
} from "@/lib/enums";

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

    let initialJobType = jobTypeOptions[0]!;
    let initialWorkFormat = workFormatOptions[0]!;
    let initialExperienceLevel = experienceLevelOptions[0]!;
    let initialStartDate = new Date();
    let initialEndDate = new Date();

    if (initialPayload !== undefined) {
        initialJobType =
            jobTypeOptions.find(
                (item) => item.id === initialPayload.item.jobType
            ) ?? initialJobType;
        initialWorkFormat =
            workFormatOptions.find(
                (item) => item.id === initialPayload.item.workFormat
            ) ?? initialWorkFormat;
        initialExperienceLevel =
            experienceLevelOptions.find(
                (item) => item.id === initialPayload.item.experienceLevel
            ) ?? initialExperienceLevel;
        initialStartDate = new Date(initialPayload.item.startDate);
        if (initialPayload.item.endDate !== null) {
            initialEndDate = new Date(initialPayload.item.endDate);
        }
    }

    const initialStartYear =
        yearOptions.find(
            (item) => item.id === initialStartDate.getUTCFullYear().toString()
        ) ?? yearOptions.at(0)!;

    const initialStartMonth =
        MONTH_OPTIONS.find(
            (item) => item.id === getMonth(initialStartDate).toString()
        ) ?? MONTH_OPTIONS.at(0)!;

    const initialEndYear =
        yearOptions.find(
            (item) => item.id === initialEndDate.getUTCFullYear().toString()
        ) ?? yearOptions.at(0)!;

    const initialEndMonth =
        MONTH_OPTIONS.find(
            (item) => item.id === getMonth(initialEndDate).toString()
        ) ?? MONTH_OPTIONS.at(0)!;

    const jobIsCurrent = useBoolean(true);

    const title = useInput({
        initialValue: initialPayload?.item.title ?? "",
        validators: [fillThisFieldValidator],
    });
    const company = useInput({
        initialValue: initialPayload?.item.companyName ?? "",
        validators: [fillThisFieldValidator],
    });
    const location = useInput({
        initialValue: initialPayload?.item.jobLocation ?? "",
        validators: [fillThisFieldValidator],
    });
    const jobType = useObjectInput({
        initialValue: initialJobType,
    });
    const workFormat = useObjectInput({
        initialValue: initialWorkFormat,
    });
    const experienceLevel = useObjectInput({
        initialValue: initialExperienceLevel,
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
    const startYearInt = Number(startYear.value.name);
    const endYearInt = Number(endYear.value.name);
    const startMonthInt = Number(startMonth.value.id);
    const endMonthInt = Number(endMonth.value.id);
    const today = new Date();
    const currentYear = today.getUTCFullYear();
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

function fillThisFieldValidator(val: string) {
    return val.length > 0
        ? ({ type: "success" } as const)
        : ({
              type: "error",
              message: "Це обов'язкове поле",
          } as const);
}

const MAX_ALLOWED_YEAR_RANGE = 50;
