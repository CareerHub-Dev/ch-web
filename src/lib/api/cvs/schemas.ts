import { z } from 'zod';

export const CvSchema = z.object({
  id: z.string(),
  title: z.string(),
  created: z.string(),
  modified: z.string().nullable(),
});

export const CvsArraySchema = z.array(CvSchema);

export type StudentCv = z.infer<typeof CvSchema>;

export type StudentCvs = z.infer<typeof CvsArraySchema>;
