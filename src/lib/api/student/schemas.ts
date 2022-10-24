import { z } from 'zod';

export const CompanySubscriptionSchema = z.object({
  id: z.string(),
  name: z.string(),
  photo: z.string().nullish(),
  motto: z.string(),
  description: z.string(),
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

export type StudentSubscription = z.infer<typeof StudentSubscriptionSchema>;
export type StudentSubscriptionsArray = z.infer<
  typeof StudentSubscriptionsArraySchema
>;
