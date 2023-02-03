import { z } from 'zod';

export const JobPositionSchema = z.object({
  id: z.string(),
  name: z.string(),
});

export const JobPositionArraySchema = z.array(JobPositionSchema);

export type JobPosition = z.infer<typeof JobPositionSchema>;

export type JobPositionArray = z.infer<typeof JobPositionArraySchema>;
