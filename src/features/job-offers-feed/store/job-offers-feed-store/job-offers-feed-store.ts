import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { SortExpression } from "../../sort-expressions";

type Option = { id: string | null; name: string };

const unselectedOption = { id: null, name: "Будь-який" };

export type JobOffersFeedState = {
  search: string;
  jobType: Option;
  workFormat: Option;
  experienceLevel: Option;
  jobPosition: Option;
  tags: Tag[];
  tagsSearch: string;
  mobileFiltersOpen: boolean;
  sortExpression: SortExpression;
};

type JobOffersFeedActions = {
  setSearch: (search: string) => void;
  setJobType: (jobType: Option) => void;
  setWorkFormat: (workFormat: Option) => void;
  setExperienceLevel: (experienceLevel: Option) => void;
  setJobPosition: (jobPositionId: Option) => void;
  addTag: (tag: Tag) => void;
  removeTag: (tag: Tag) => void;
  setTagsSearch: (tagsSearch: string) => void;
  setMobileFiltersOpen: (mobileFiltersOpen: boolean) => void;
  closeMobileFilters: () => void;
  openMobileFilters: () => void;
  changeSortExpression: (sortExpression: SortExpression) => void;
  resetFilters: () => void;
};

export type JobOffersFeedStore = JobOffersFeedState & JobOffersFeedActions;

export const initialJobOffersFeedState: JobOffersFeedState = {
  search: "",
  jobType: unselectedOption,
  workFormat: unselectedOption,
  experienceLevel: unselectedOption,
  jobPosition: unselectedOption,
  tags: [],
  tagsSearch: "",
  mobileFiltersOpen: false,
  sortExpression: SortExpression.StartDateAsc,
};

export const useJobOffersFeedStore = create<JobOffersFeedStore>()(
  devtools(
    immer((set) => ({
      ...initialJobOffersFeedState,
      setSearch: (search: string) =>
        set((state) => {
          state.search = search;
        }),
      setJobType: (jobType: Option) =>
        set((state) => {
          state.jobType = jobType;
        }),
      setWorkFormat: (workFormat: Option) =>
        set((state) => {
          state.workFormat = workFormat;
        }),
      setExperienceLevel: (experienceLevel: Option) =>
        set((state) => {
          state.experienceLevel = experienceLevel;
        }),
      setJobPosition: (jobPosition: Option) =>
        set((state) => {
          state.jobPosition = jobPosition;
        }),
      addTag: (tag: Tag) =>
        set((state) => {
          if (state.tags.find((t) => t.id === tag.id)) {
            return;
          }
          state.tags.push(tag);
        }),
      removeTag: (tag: Tag) =>
        set((state) => {
          state.tags = state.tags.filter((t) => t.id !== tag.id);
        }),
      setTagsSearch: (tagsSearch: string) =>
        set((state) => {
          state.tagsSearch = tagsSearch;
        }),
      setMobileFiltersOpen: (mobileFiltersOpen: boolean) =>
        set((state) => {
          state.mobileFiltersOpen = mobileFiltersOpen;
        }),
      closeMobileFilters: () =>
        set((state) => {
          state.mobileFiltersOpen = false;
        }),
      openMobileFilters: () =>
        set((state) => {
          state.mobileFiltersOpen = true;
        }),
      resetFilters: () =>
        set((state) => {
          state.search = "";
          state.jobType = unselectedOption;
          state.workFormat = unselectedOption;
          state.experienceLevel = unselectedOption;
          state.jobPosition = unselectedOption;
          state.tags = [];
          state.tagsSearch = "";
        }),
      changeSortExpression: (sortExpression: SortExpression) =>
        set((state) => {
          state.sortExpression = sortExpression;
        }),
    }))
  )
);
