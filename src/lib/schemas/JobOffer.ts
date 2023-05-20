import { z } from "zod";

const JobOfferSchema = z.object({
    id: z.string(),
    title: z.string(),
    image: z.string().nullable(),
    startDate: z.string(),
    endDate: z.string(),
    jobType: z.string(),
    workFormat: z.string(),
    experienceLevel: z.string(),
    jobPosition: z.object({
        id: z.string(),
        name: z.string(),
    }),
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
});

export default JobOfferSchema;

export const JobOfferArraySchema = z.array(JobOfferSchema);

export type JobOffer = z.infer<typeof JobOfferSchema>;

export type JobOfferArray = z.infer<typeof JobOfferArraySchema>;
