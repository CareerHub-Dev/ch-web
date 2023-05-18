import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from ".";
import { JobType, WorkFormat, ExperienceLevel } from "@/lib/enums";

type JobOffersFeedState = {
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

const initialJobOffersFeedState: JobOffersFeedState = {
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

const jobOffersFeedSlice = createSlice({
    name: "jobOffersFeed",
    initialState: initialJobOffersFeedState,
    reducers: {
        setSearchTerm: (state, action: PayloadAction<string>) => {
            state.searchTerm = action.payload;
        },
        setJobType: (state, action: PayloadAction<Nullable<JobType>>) => {
            state.jobType = action.payload;
        },
        setWorkFormat: (state, action: PayloadAction<Nullable<WorkFormat>>) => {
            state.workFormat = action.payload;
        },
        setExperienceLevel: (
            state,
            action: PayloadAction<Nullable<ExperienceLevel>>
        ) => {
            state.experienceLevel = action.payload;
        },
        setJobPositionId: (state, action: PayloadAction<string>) => {
            state.jobPositionId = action.payload;
        },
        addTag: (state, action: PayloadAction<Tag>) => {
            const tags = state.tags;
            console.log("tags", tags, action.payload);

            if (!tags.find((tag) => tag.id === action.payload.id)) {
                tags.push(action.payload);
            }
        },
        removeTag: (state, action: PayloadAction<Tag>) => {
            const tags = state.tags;
            const index = tags.findIndex((tag) => tag.id === action.payload.id);
            if (index !== -1) {
                tags.splice(index, 1);
            }
        },
        clearTags: (state) => {
            state.tags = [];
        },
        setTagsSearch: (state, action: PayloadAction<string>) => {
            state.tagsSearch = action.payload;
        },
        setFilterApplied: (state, action: PayloadAction<boolean>) => {
            const val = action.payload;
            if (val) {
                state.filterApplied = val;
                state.appliedValues = {
                    searchTerm: state.searchTerm,
                    jobType: state.jobType as string,
                    experienceLevel: state.experienceLevel as string,
                    workFormat: state.workFormat as string,
                    tagIds: state.tags.map((tag) => tag.id),
                };
            }
        },
        reset: (_) => {
            return {
                ...initialJobOffersFeedState,
            };
        },
    },
});

export const selectSearchTerm = (state: RootState) =>
    state.jobOffersFeed.searchTerm;
export const selectJobType = (state: RootState) => state.jobOffersFeed.jobType;
export const selectWorkFormat = (state: RootState) =>
    state.jobOffersFeed.workFormat;
export const selectExperienceLevel = (state: RootState) =>
    state.jobOffersFeed.experienceLevel;
export const selectJobPositionId = (state: RootState) =>
    state.jobOffersFeed.jobPositionId;
export const selectTags = (state: RootState) => state.jobOffersFeed.tags;
export const selectTagsSearch = (state: RootState) =>
    state.jobOffersFeed.tagsSearch;
export const selectFilterApplied = (state: RootState) =>
    state.jobOffersFeed.filterApplied;
export const selectFilterOptions: (state: RootState) => {
    filter: Nullable<JobOfferFilter>;
    isApplied: boolean;
} = (state: RootState) => {
    const slice = state.jobOffersFeed;
    return {
        isApplied: slice.filterApplied,
        filter: slice.appliedValues,
    };
};

export const {
    setExperienceLevel,
    setJobPositionId,
    setJobType,
    setSearchTerm,
    setWorkFormat,
    addTag,
    removeTag,
    clearTags,
    setTagsSearch,
    setFilterApplied,
    reset,
} = jobOffersFeedSlice.actions;

export default jobOffersFeedSlice.reducer;
