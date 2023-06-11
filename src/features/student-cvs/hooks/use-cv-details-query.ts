import { AxiosInstance } from "axios";
import { z } from "zod";
import { request } from "@/lib/axios";
import { useProtectedQuery } from "@/hooks/useProtectedQuery";
import { useQueryClient } from "@tanstack/react-query";
import useSession from "@/hooks/useSession";

const CvDetailsSchema = z.object({
  id: z.string(),
  title: z.string(),
  created: z.string(),
  modified: z.string().nullish(),
  experienceLevel: z.string(),
  jobDirection: z.object({
    id: z.string(),
    name: z.string(),
    recomendedTemplateLanguage: z.string(),
  }),
  jobPosition: z.object({
    id: z.string(),
    name: z.string(),
  }),
  templateLanguage: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  photo: z.string().nullish(),
  goals: z.string(),
  hardSkills: z.array(z.string()),
  softSkills: z.array(z.string()),
  studentId: z.string(),
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
      specialty: z.string(),
      degree: z.string(),
      startDate: z.string(),
      endDate: z.string().nullish(),
    })
  ),
  experiences: z.array(
    z.object({
      title: z.string(),
      companyName: z.string(),
      jobType: z.string(),
      workFormat: z.string(),
      experienceLevel: z.string(),
      jobLocation: z.string(),
      startDate: z.string(),
      endDate: z.string().nullish(),
    })
  ),
});

export type CvDetails = z.infer<typeof CvDetailsSchema>;

export function getStudentOwnCv(cvId: string) {
  return (instance: AxiosInstance) =>
    request({
      instance,
      url: `/Student/self/CVs/${cvId}`,
      select: (response) => CvDetailsSchema.parseAsync(response.data),
    });
}

export function getCvDetailsAsCompany(cvId: string) {
  return (instance: AxiosInstance) =>
    request({
      instance,
      url: `/Company/CVs/${cvId}`,
      select: (response) => CvDetailsSchema.parseAsync(response.data),
    });
}

export function useCvDetailsQuery(cvId: string) {
  const session = useSession();
  const role = session?.data?.role ?? "Student";
  const queryFn =
    role === "Student" ? getStudentOwnCv(cvId) : getCvDetailsAsCompany(cvId);

  return useProtectedQuery(["cv-details", cvId], queryFn);
}

export function useCvQueryData(cvId: string | null) {
  const queryClient = useQueryClient();
  if (!cvId) return null;
  return queryClient.getQueryData(["cv-details", cvId]) as CvDetails;
}
