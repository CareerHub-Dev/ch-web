import { z } from 'zod';

export const CompanyBriefSchema = z.object({
  id: z.string(),
  name: z.string(),
  logo: z.string().nullish(),
  motto: z.string(),
});

export const CompanyInFeedSchema = CompanyBriefSchema.and(
  z.object({
    amountSubscribers: z.number(),
    amountJobOffers: z.number(),
  })
);

export const CompanyInFeedArraySchema = z.array(CompanyInFeedSchema);

export const CompanyDetailsSchema = CompanyBriefSchema.and(
  z.object({
    email: z.string(),
    banner: z.string().nullish(),
    description: z.string(),
  })
);

export const CompanyJobOfferSchema = z.object({
  id: z.string(),
  title: z.string(),
  image: z.string().nullish(),
  startDate: z.string(),
  endDate: z.string(),
  tags: z.array(
    z.object({
      id: z.string(),
      name: z.string(),
    })
  ),
});

export const CompanyJobOffersArraySchema = z.array(CompanyJobOfferSchema);

export type CompanyBrief = z.infer<typeof CompanyBriefSchema>;
export type CompanyInFeed = z.infer<typeof CompanyInFeedSchema>;
export type CompanyInFeedArray = z.infer<typeof CompanyInFeedArraySchema>;
export type CompanyDetails = z.infer<typeof CompanyDetailsSchema>;
export type CompanyJobOffer = z.infer<typeof CompanyJobOfferSchema>;
export type CompanyJobOffersArray = z.infer<typeof CompanyJobOffersArraySchema>;
