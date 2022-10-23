import { z } from 'zod';

const JobOfferSchema = z.object({
  id: z.string(),
});

export default JobOfferSchema;

export const JobOfferArraySchema = z.array(JobOfferSchema);

export type JobOffer = z.infer<typeof JobOfferSchema>;

export type JobOfferArray = z.infer<typeof JobOfferArraySchema>;
