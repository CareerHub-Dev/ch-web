import { z } from "zod";

const StudentBriefSchema = z.object({
  id: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  email: z.string(),
  isFollowed: z.boolean().nullish(),
  photo: z.string().nullish(),
  studentGroup: z.object({
    id: z.string(),
    name: z.string(),
  }),
});

const StudentSchema = StudentBriefSchema.and(
  z.object({
    phone: z.string().nullish(),
    birthDate: z.string().nullish(),
  })
);
export default StudentSchema;

export const StudentArraySchema = z.array(StudentSchema);

export const StudentBriefArraySchema = z.array(StudentBriefSchema);

export type Student = z.infer<typeof StudentSchema>;

export type StudentBrief = z.infer<typeof StudentBriefSchema>;

export type StudentArray = z.infer<typeof StudentArraySchema>;

export type StudentBriefArray = z.infer<typeof StudentBriefArraySchema>;
