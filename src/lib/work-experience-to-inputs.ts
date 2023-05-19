import { getMonthOption } from "./date";
import getMonth from "date-fns/getMonth";
import getYear from "date-fns/getYear";
import parseISO from "date-fns/parseISO";
import {
    jobTypeOptions,
    workFormatOptions,
    experienceLevelOptions,
} from "./enums";
import {
    WorkExperience,
    WorkExperienceInputValues,
} from "@/features/work-experience/types";

export function workExperienceToInputs(
    payload?: WorkExperience
): WorkExperienceInputValues {
    let title = "";
    let companyName = "";
    let jobType = jobTypeOptions[0]!;
    let workFormat = workFormatOptions[0]!;
    let experienceLevel = experienceLevelOptions[0]!;
    let startDate = new Date();
    let endDate = new Date();
    let isCurrent = false;
    let isRemote = false;
    let jobLocation: string = "";

    if (payload !== undefined) {
        title = payload.title;
        companyName = payload.companyName;
        jobType =
            jobTypeOptions.find((item) => item.id === payload.jobType) ??
            jobType;
        workFormat =
            workFormatOptions.find((item) => item.id === payload.workFormat) ??
            workFormat;
        experienceLevel =
            experienceLevelOptions.find(
                (item) => item.id === payload.experienceLevel
            ) ?? experienceLevel;
        startDate = parseISO(payload.startDate);

        if (payload.endDate !== null) {
            endDate = parseISO(payload.endDate);
        } else {
            isCurrent = true;
        }

        if (payload.jobLocation !== null) {
            jobLocation = payload.jobLocation;
        } else {
            isRemote = true;
        }
    }
    let startYearStr = getYear(startDate).toString();
    let startYear = {
        name: startYearStr,
        id: startYearStr,
    };
    let startMonth = getMonthOption(getMonth(startDate))!;

    let endYearStr = getYear(endDate).toString();
    let endYear = {
        name: endYearStr,
        id: endYearStr,
    };
    let endMonth = getMonthOption(getMonth(endDate));

    return {
        title,
        companyName,
        jobType,
        workFormat,
        experienceLevel,
        jobLocation,
        startYear,
        startMonth,
        endYear,
        endMonth,
        isCurrent,
        isRemote,
    };
}
