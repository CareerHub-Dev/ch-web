import "@testing-library/jest-dom";
import { workExperienceToInputs } from "../work-experience-to-inputs";
import {
    workFormatOptions,
    jobTypeOptions,
    experienceLevelOptions,
} from "../enums";
import getMonth from "date-fns/getMonth";
import { MONTH_OPTIONS } from "../util";
import {
    WorkExperience,
    WorkExperienceInputValues,
} from "@/features/cv-builder/store/cv-data-store/cv";

describe("workExperienceToInputs", () => {
    it("should return default values if no payload is provided", () => {
        const result = workExperienceToInputs();
        const today = new Date();
        const currentYear = today.getFullYear().toString();
        const currentYearOption = { name: currentYear, id: currentYear };
        const currentMonth = getMonth(today);
        const currentMonthOption = MONTH_OPTIONS.at(currentMonth - 1)!;

        const expected: WorkExperienceInputValues = {
            title: "",
            companyName: "",
            jobLocation: "",
            jobType: jobTypeOptions[0]!,
            workFormat: workFormatOptions[0]!,
            experienceLevel: experienceLevelOptions[0]!,
            startYear: currentYearOption,
            startMonth: currentMonthOption,
            endYear: currentYearOption,
            endMonth: currentMonthOption,
            isCurrent: false,
            isRemote: false,
        };

        expect(result).toEqual(expected);
    });

    it("should return correct values if payload is provided", () => {
        const payload: WorkExperience = {
            title: "title",
            companyName: "companyName",
            jobLocation: "jobLocation",
            jobType: jobTypeOptions.at(0)!.id,
            workFormat: workFormatOptions.at(0)!.id,
            experienceLevel: experienceLevelOptions.at(0)!.id,
            startDate: new Date(2020, 11, 1).toISOString(),
            endDate: new Date(2021, 12, 1).toISOString(),
        };
        const expected: WorkExperienceInputValues = {
            title: "title",
            companyName: "companyName",
            jobLocation: "jobLocation",
            jobType: jobTypeOptions.at(0)!,
            workFormat: workFormatOptions.at(0)!,
            experienceLevel: experienceLevelOptions.at(0)!,
            startYear: { name: "2020", id: "2020" },
            startMonth: MONTH_OPTIONS.at(10)!,
            endYear: { name: "2021", id: "2021" },
            endMonth: MONTH_OPTIONS.at(11)!,
            isCurrent: false,
            isRemote: false,
        };
        const result1 = workExperienceToInputs(payload);

        expect(result1).toEqual(expected);
    });

    it("should correctly handle null values in payload", () => {
        const payload: WorkExperience = {
            title: "title",
            companyName: "companyName",
            jobLocation: null,
            jobType: jobTypeOptions.at(0)!.id,
            workFormat: workFormatOptions.at(0)!.id,
            experienceLevel: experienceLevelOptions.at(0)!.id,
            startDate: new Date(2020, 11, 1).toISOString(),
            endDate: null,
        };
        const result = workExperienceToInputs(payload);

        expect(result.jobLocation).toEqual("");
        expect(result.isRemote).toEqual(true);
        expect(result.isCurrent).toEqual(true);
    });
});
