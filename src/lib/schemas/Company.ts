import { z } from 'zod';

const CompanySchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string(),
  logoId: z.string().nullable(),
  bannerId: z.string().nullable(),
  motto: z.string(),
  description: z.string(),
  amountSubscribers: z.number(),
  amountJobOffers: z.number(),
  isFollowed: z.boolean(),
});

export default CompanySchema;

export const CompanyArraySchema = z.array(CompanySchema);

export type Company = z.infer<typeof CompanySchema>;

export type CompanyArray = z.infer<typeof CompanyArraySchema>;
