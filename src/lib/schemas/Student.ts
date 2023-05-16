import { z } from "zod";

const StudentSchema = z.object({
    id: z.string(),
    firstName: z.string(),
    lastName: z.string(),
    email: z.string(),
    photo: z.string().nullish(),
    phone: z.string().nullish(),
    birthDate: z.string().nullish(),
    studentGroup: z.object({
        id: z.string(),
        name: z.string(),
    }),
});
export default StudentSchema;

export const StudentArraySchema = z.array(StudentSchema);

export type Student = z.infer<typeof StudentSchema>;

export type StudentArray = z.infer<typeof StudentArraySchema>;
