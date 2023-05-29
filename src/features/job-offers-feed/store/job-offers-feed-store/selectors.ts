import { JobOffersFeedStore } from "./job-offers-feed-store";

type QueryParams = { search: string; order: string } & Partial<{
  workFormat: string;
  jobType: string;
  experienceLevel: string;
  jobPositionId: string;
}>;

export function selectQueryParams(store: JobOffersFeedStore) {
  const nullableParams = {
    search: store.search,
    order: store.sortExpression,
    workFormat: store.workFormat.id,
    jobType: store.jobType.id,
    experienceLevel: store.experienceLevel.id,
    jobPositionId: store.jobPosition.id,
  };

  return Object.fromEntries(
    Object.entries(nullableParams).filter(([, value]) => value != null)
  ) as QueryParams;
}

export function selectFilters(store: JobOffersFeedStore) {
  return {
    jobType: store.jobType,
    setJobType: store.setJobType,
    workFormat: store.workFormat,
    setWorkFormat: store.setWorkFormat,
    experienceLevel: store.experienceLevel,
    setExperienceLevel: store.setExperienceLevel,
    jobPosition: store.jobPosition,
    setJobPositionId: store.setJobPosition,
  };
}
