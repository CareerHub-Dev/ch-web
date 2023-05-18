import {
    WorkExperience,
    WorkExperienceInputValues,
} from "@/features/cv-builder/store/cv-data-store/cv";
import { MONTH_OPTIONS } from "./util";
import getMonth from "date-fns/getMonth";
import {
    jobTypeOptions,
    workFormatOptions,
    experienceLevelOptions,
} from "./enums";

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
        startDate = new Date(payload.startDate);

        if (payload.endDate !== null) {
            endDate = new Date(payload.endDate);
        } else {
            isCurrent = true;
        }

        if (payload.jobLocation !== null) {
            jobLocation = payload.jobLocation;
        } else {
            isRemote = true;
        }
    }

    let startYearStr = startDate.getUTCFullYear().toString();
    let startYear = {
        name: startYearStr,
        id: startYearStr,
    };
    let startMonth = MONTH_OPTIONS.at(getMonth(startDate) - 1)!;

    let endYearStr = endDate.getUTCFullYear().toString();
    let endYear = {
        name: endYearStr,
        id: endYearStr,
    };
    let endMonth = MONTH_OPTIONS.at(getMonth(endDate) - 1)!;

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
