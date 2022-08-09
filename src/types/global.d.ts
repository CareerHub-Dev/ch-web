export {};

declare global {
  interface JobOfferFilter {
    searchTerm?: string;
    jobType?: string;
    workFormat?: string;
    experienceLevel?: string;
    jobPositionId?: string;
    tagIds: Array<string>;
  }

  interface Tag {
    id: string;
    title: string;
  }

  namespace JobOffersFeed {
    interface JobOffer {
      id: string;
      companyId: string;
      companyName: string;
      title: string;
      endDate: string;
      amountSubscribers: number;
      amountAppliedCVs: number;
      tags: Array<Tag>;
    }
  }

  namespace JobOfferDetails {
    interface JobOffer {
      id: string;
      companyId: string;
      companyName: string;
      title: string;
      overview: string;
      requirements: string;
      responsibilities: string;
      startDate: string;
      endDate: string;
      jobPositionId: string;
      jobType: string;
      workFormat: string;
      experienceLevel: string;
      tags: Array<Tag>;
    }
  }

  type AnyFn = (...args: any[]) => any;
  type Nullable<T> = T | null;
}
