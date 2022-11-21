import { z } from 'zod';

export const JobOfferInFeedSchema = z.object({
  id: z.string(),
  title: z.string(),
  image: z.string().nullish(),
  startDate: z.string(),
  endDate: z.string(),
  jobType: z.string(),
  workFormat: z.string(),
  experienceLevel: z.string(),
  company: z.object({
    id: z.string(),
    name: z.string(),
  }),
  tags: z.array(
    z.object({
      id: z.string(),
      name: z.string(),
    })
  ),
  amountSubscribers: z.number(),
  amountAppliedCVs: z.number(),
});
export const JobOfferFeedSchema = z.array(JobOfferInFeedSchema);

export type JobOfferInFeed = z.infer<typeof JobOfferInFeedSchema>;
export type JobOfferFeed = z.infer<typeof JobOfferFeedSchema>;
