import { z } from 'zod';

export const CvSchema = z.object({
  id: z.string(),
  title: z.string(),
  created: z.string(),
  modified: z.string(),
});

export const CvsArraySchema = z.array(CvSchema);

export type StudentCvs = z.infer<typeof CvsArraySchema>;
