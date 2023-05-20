import { ExperienceLevel, JobType, WorkFormat } from "@/lib/enums";

export type JobOffersFeedState = {
    searchTerm: string;
    jobType: Nullable<JobType>;
    workFormat: Nullable<WorkFormat>;
    experienceLevel: Nullable<ExperienceLevel>;
    jobPositionId: Nullable<string>;
    tags: Tag[];
    tagsSearch: string;
    appliedValues: Nullable<JobOfferFilter>;
    filterApplied: boolean;
};

export const initialJobOffersFeedState: JobOffersFeedState = {
    searchTerm: "",
    jobType: null,
    workFormat: null,
    experienceLevel: null,
    jobPositionId: null,
    tags: [],
    tagsSearch: "",
    appliedValues: null,
    filterApplied: false,
};
