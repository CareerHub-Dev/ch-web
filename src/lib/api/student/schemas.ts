import { z } from "zod";

export const CompanySubscriptionSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string(),
  logo: z.string().nullish(),
  motto: z.string(),
  isFollowed: z.boolean(),
});

export const CompanySubscriptionsArraySchema = z.array(
  CompanySubscriptionSchema
);

export type CompanySubscription = z.infer<typeof CompanySubscriptionSchema>;
export type CompanySubscriptionsArray = z.infer<
  typeof CompanySubscriptionsArraySchema
>;

export const StudentSubscriptionSchema = z.object({
  id: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  email: z.string(),
  isFollowed: z.boolean(),
  photo: z.string().nullish(),
  studentGroup: z.object({
    id: z.string(),
    name: z.string(),
  }),
});

export const StudentSubscriptionsArraySchema = z.array(
  StudentSubscriptionSchema
);

export const StudentSubscriberSchema = z.object({
  id: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  photo: z.string().nullish(),
  email: z.string(),
  studentGroup: z.object({
    id: z.string(),
    name: z.string(),
  }),
});

export const StudentSubscribersArraySchema = z.array(StudentSubscriberSchema);

export type StudentSubscription = z.infer<typeof StudentSubscriptionSchema>;
export type StudentSubscriptionsArray = z.infer<
  typeof StudentSubscriptionsArraySchema
>;
export type StudentSubscriber = z.infer<typeof StudentSubscriberSchema>;

export const ExperienceSchema = z.object({
  id: z.string(),
  title: z.string(),
  companyName: z.string(),
  jobType: z.string(),
  workFormat: z.string(),
  experienceLevel: z.string(),
  jobLocation: z.string().nullable(),
  startDate: z.string(),
  endDate: z.string().nullable(),
});

export const ExperiencesArraySchema = z.array(ExperienceSchema);

export type Experience = z.infer<typeof ExperienceSchema>;
export type ExperiencesArray = z.infer<typeof ExperiencesArraySchema>;
