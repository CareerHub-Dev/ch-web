export {};

declare global {
  interface JobOfferFilter {
    jobType?: string;
    workFormat?: string;
    experienceLevel?: string;
    withTags?: boolean;
    jobPositionId?: string;
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
}
