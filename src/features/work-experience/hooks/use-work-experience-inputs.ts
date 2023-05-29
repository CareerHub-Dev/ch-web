import { workExperienceToInputs } from "@/lib/work-experience-to-inputs";
import { WorkExperience } from "../types";
import { MONTH_OPTIONS, getYearOptions } from "@/lib/date";
import { useMemo } from "react";
import { useBoolean } from "usehooks-ts";
import { useInput } from "@/hooks/useInput";
import getMonth from "date-fns/getMonth";
import { useObjectInput } from "@/hooks/useObjectInput";

export function useWorkExperienceInputs(
  initialPayload?: WorkExperience | undefined,
  maxYearRange: number = MAX_ALLOWED_YEAR_RANGE
) {
  const yearOptions = useMemo(
    () => getYearOptions(maxYearRange),
    [maxYearRange]
  );
  const initialInputs = useMemo(
    () => workExperienceToInputs(initialPayload),
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

  const isCurrent = useBoolean(initialInputs.isCurrent);

  const title = useInput({
    initialValue: initialInputs.title,
    validators: [fillThisFieldValidator],
  });
  const companyName = useInput({
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
    (!isCurrent.value &&
      (startYearInt > endYearInt ||
        (startYearInt === endYearInt && startMonthInt > endMonthInt))) ||
    startYearInt > currentYear ||
    (startYearInt === currentYear && startMonthInt > currentMonth);

  const allInputs = [
    title,
    companyName,
    location,
    jobType,
    workFormat,
    experienceLevel,
    startYear,
    startMonth,
    endYear,
    endMonth,
  ];

  const someTimePeriodInputWasBlurred =
    startYear.wasBlurred ||
    startMonth.wasBlurred ||
    endYear.wasBlurred ||
    endMonth.wasBlurred;

  const thereAreSomeBlurredErrors =
    allInputs.some((item) => item.hasErrors && item.wasBlurred) ||
    (someTimePeriodInputWasBlurred && timePeriodIsInvalid);

  const thereAreSomeInvalidInputs = allInputs.some((item) => !item.isValid);

  const blurAll = () => {
    allInputs.forEach((item) => item.blur());
  };

  const startDate = new Date(startYearInt, startMonthInt).toISOString();
  const endDate = isCurrent.value
    ? null
    : new Date(endYearInt, endMonthInt).toISOString();
  const values = {
    title: title.value,
    companyName: companyName.value,
    jobLocation: location.value,
    jobType: jobType.value.id,
    workFormat: workFormat.value.id,
    experienceLevel: experienceLevel.value.id,
    startDate,
    endDate,
  };

  return {
    thereAreSomeBlurredErrors,
    thereAreSomeInvalidInputs,
    title,
    companyName,
    location,
    jobType,
    workFormat,
    experienceLevel,
    startYear,
    startMonth,
    endYear,
    endMonth,
    isCurrent,
    isRemote,
    timePeriodIsInvalid,
    yearOptions,
    values,
    blurAll,
  };
}

export type UseWorkExperienceInputs = ReturnType<
  typeof useWorkExperienceInputs
>;

const MAX_ALLOWED_YEAR_RANGE = 50;

function fillThisFieldValidator(val: string) {
  return val.length > 0
    ? ({ type: "success" } as const)
    : ({
        type: "error",
        message: "Це обов'язкове поле",
      } as const);
}
