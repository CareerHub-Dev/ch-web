import "@testing-library/jest-dom";
import { workExperienceToInputs } from "../work-experience-to-inputs";
import {
  workFormatOptions,
  jobTypeOptions,
  experienceLevelOptions,
} from "../enums";
import getMonth from "date-fns/getMonth";
import { getMonthOption } from "../date";
import {
  WorkExperience,
  WorkExperienceInputValues,
} from "@/features/work-experience/types";

describe("workExperienceToInputs", () => {
  it("should return default values if no payload is provided", () => {
    const result = workExperienceToInputs();
    const today = new Date();
    const currentYear = today.getFullYear().toString();
    const currentYearOption = { name: currentYear, id: currentYear };
    const currentMonth = getMonth(today);
    const currentMonthOption = getMonthOption(currentMonth);

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
    const startYear = 2020;
    const startYearStr = startYear.toString();
    const endYear = 2021;
    const endYearStr = endYear.toString();
    const startMonth = 11;
    const endMonth = 12;

    const payload: WorkExperience = {
      title: "title",
      companyName: "companyName",
      jobLocation: "jobLocation",
      jobType: jobTypeOptions.at(0)!.id,
      workFormat: workFormatOptions.at(0)!.id,
      experienceLevel: experienceLevelOptions.at(0)!.id,
      startDate: new Date(`${startYear}-${startMonth}`).toISOString(),
      endDate: new Date(`${endYear}-${endMonth}`).toISOString(),
    };
    const expected: WorkExperienceInputValues = {
      title: "title",
      companyName: "companyName",
      jobLocation: "jobLocation",
      jobType: jobTypeOptions.at(0)!,
      workFormat: workFormatOptions.at(0)!,
      experienceLevel: experienceLevelOptions.at(0)!,
      startYear: { name: startYearStr, id: startYearStr },
      startMonth: getMonthOption(startMonth - 1),
      endYear: { name: endYearStr, id: endYearStr },
      endMonth: getMonthOption(endMonth - 1),
      isCurrent: false,
      isRemote: false,
    };
    const result = workExperienceToInputs(payload);

    expect(result).toEqual(expected);
  });

  it("should correctly handle null values in payload", () => {
    const payload: WorkExperience = {
      title: "title",
      companyName: "companyName",
      jobLocation: null,
      jobType: jobTypeOptions.at(0)!.id,
      workFormat: workFormatOptions.at(0)!.id,
      experienceLevel: experienceLevelOptions.at(0)!.id,
      startDate: new Date("2020-11-01").toISOString(),
      endDate: null,
    };
    const result = workExperienceToInputs(payload);

    expect(result.jobLocation).toEqual("");
    expect(result.isRemote).toEqual(true);
    expect(result.isCurrent).toEqual(true);
  });
});
