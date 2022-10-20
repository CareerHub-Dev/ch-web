import { z } from 'zod';

const StudentSchema = z.object({
  id: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  email: z.string(),
  photoId: z.string().nullable(),
  phone: z.string().nullable(),
  birthDate: z.string().nullable(),
  studentGroup: z.object({
    id: z.string(),
    name: z.string(),
  }),
});
export default StudentSchema;

export type Student = z.infer<typeof StudentSchema>;
