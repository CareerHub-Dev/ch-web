import { JobType, WorkFormat, ExperienceLevel } from "@/lib/enums";

export type WorkExperience = {
    title: string;
    companyName: string;
    jobType: string;
    workFormat: string;
    experienceLevel: string;
    jobLocation: string | null;
    startDate: string;
    endDate: string | null;
};

export type WorkExperienceInputValues = {
    title: string;
    companyName: string;
    jobType: { name: string; id: JobType };
    workFormat: { name: string; id: WorkFormat };
    experienceLevel: { name: string; id: ExperienceLevel };
    jobLocation: string;
    startYear: { name: string; id: string };
    startMonth: { name: string; id: string };
    endYear: { name: string; id: string };
    endMonth: { name: string; id: string };
    isCurrent: boolean;
    isRemote: boolean;
};
