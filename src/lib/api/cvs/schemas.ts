import { z } from "zod";

export const CvSchema = z.object({
  id: z.string(),
  title: z.string(),
  created: z.string(),
  modified: z.string().nullish(),
});

export const CvDetailsSchema = z.object({
  id: z.string(),
  title: z.string(),
  created: z.string(),
  modified: z.string().nullish(),
  jobPosition: z.object({
    id: z.string(),
    name: z.string(),
  }),
  templateLanguage: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  photo: z.string().nullable(),
  goals: z.string(),
  skillsAndTechnologies: z.string(),
  experienceHighlights: z.string(),
  foreignLanguages: z.array(
    z.object({
      name: z.string(),
      languageLevel: z.string(),
    })
  ),
  projectLinks: z.array(
    z.object({
      title: z.string(),
      url: z.string(),
    })
  ),
  educations: z.array(
    z.object({
      university: z.string(),
      city: z.string(),
      country: z.string(),
      speciality: z.string(),
      degree: z.string(),
      startDate: z.string(),
      endDate: z.string(),
    })
  ),
});

export const CvsArraySchema = z.array(CvSchema);

export type StudentCv = z.infer<typeof CvSchema>;

export type StudentCvs = z.infer<typeof CvsArraySchema>;

export type StudentCvDetails = z.infer<typeof CvDetailsSchema>;
