import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '.';

type JobOffersFeedState = {
  jobOffers: JobOffersFeed.JobOffer[];
  currentPageNumber: number;
  pageSize: number;
  searchTerm: string;
  jobType: string | null;
  workFormat: string | null;
  experienceLevel: string | null;
  jobPositionId: string | null;
  tagIds: string[];
  pageIsLoading: boolean;
  filterApplied: boolean;
};

const initialJobOffersFeedState: JobOffersFeedState = {
  jobOffers: [],
  currentPageNumber: 1,
  pageSize: 100,
  searchTerm: '',
  jobType: null,
  workFormat: null,
  experienceLevel: null,
  jobPositionId: null,
  tagIds: [],
  pageIsLoading: true,
  filterApplied: false,
};

const jobOffersFeedSlice = createSlice({
  name: 'jobOffersFeed',
  initialState: initialJobOffersFeedState,
  reducers: {
    setPageIsLoading: (state, action: PayloadAction<boolean>) => {
      state.pageIsLoading = action.payload;
    },
    loadNextPage: (state) => {
      ++state.currentPageNumber;
      state.pageIsLoading = true;
    },
    addJobOffers: (state, action: PayloadAction<JobOffersFeed.JobOffer[]>) => {
      state.jobOffers = [...state.jobOffers, ...action.payload];
      state.pageIsLoading = false;
    },
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;
    },
    setJobType: (state, action: PayloadAction<string>) => {
      state.jobType = action.payload;
    },
    setWorkFormat: (state, action: PayloadAction<string>) => {
      state.workFormat = action.payload;
    },
    setExperienceLevel: (state, action: PayloadAction<string>) => {
      state.experienceLevel = action.payload;
    },
    setJobPositionId: (state, action: PayloadAction<string>) => {
      state.jobPositionId = action.payload;
    },
    resetPages: (state) => {
      state.currentPageNumber = 1;
      state.pageIsLoading = true;
      state.jobOffers = [];
    },
    setFilterApplied: (state, action: PayloadAction<boolean>) => {
      const val = action.payload;
      state.filterApplied = val;
    },
  },
});

export const selectJobOffers = (state: RootState) =>
  state.jobOffersFeed.jobOffers;
export const selectCurrentPage = (state: RootState) =>
  state.jobOffersFeed.currentPageNumber;
export const selectPageSize = (state: RootState) =>
  state.jobOffersFeed.pageSize;
export const selectSearchTerm = (state: RootState) =>
  state.jobOffersFeed.searchTerm;
export const selectJobType = (state: RootState) => state.jobOffersFeed.jobType;
export const selectWorkFormat = (state: RootState) =>
  state.jobOffersFeed.workFormat;
export const selectExperienceLevel = (state: RootState) =>
  state.jobOffersFeed.experienceLevel;
export const selectJobPositionId = (state: RootState) =>
  state.jobOffersFeed.jobPositionId;
export const selectTagIds = (state: RootState) => state.jobOffersFeed.tagIds;
export const selectPageIsLoading = (state: RootState) =>
  state.jobOffersFeed.pageIsLoading;
export const selectFilterApplied = (state: RootState) =>
  state.jobOffersFeed.filterApplied;

export const {
  setExperienceLevel,
  setJobPositionId,
  setJobType,
  setSearchTerm,
  setWorkFormat,
  loadNextPage,
  addJobOffers,
  setPageIsLoading,
  resetPages,
} = jobOffersFeedSlice.actions;

export default jobOffersFeedSlice.reducer;
