import { z } from 'zod';

export const JobOfferFeedSchema = z.array(
  z.object({
    id: z.string(),
    title: z.string(),
    image: z.string(),
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
    amountAppliedCvs: z.number(),
  })
);
export type JobOfferFeed = z.infer<typeof JobOfferFeedSchema>;