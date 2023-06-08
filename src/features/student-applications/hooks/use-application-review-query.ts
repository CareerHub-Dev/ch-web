import { request } from "@/lib/axios";
import { AxiosInstance } from "axios";
import { useProtectedQuery } from "@/hooks/useProtectedQuery";
import {
  StudentReviewSchema,
  studentReviewQueryKeyPart,
} from "./use-student-reviews-query";
import { z } from "zod";

export const ApplicationReviewDetailsSchema = z.object({
  id: z.string(),
  status: z.string(),
  message: z.string().nullable(),
  created: z.string(),
  cv: z.object({
    id: z.string(),
    title: z.string(),
    created: z.string(),
    modified: z.string().nullable(),
  }),
  jobOffer: z.object({
    id: z.string(),
    title: z.string(),
    image: z.string().nullable(),
  }),
  student: z.object({
    id: z.string(),
    firstName: z.string(),
    lastName: z.string(),
    photo: z.string().nullable(),
    email: z.string(),
    phone: z.string().nullable(),
    birthDate: z.string().nullable(),
    studentGroup: z.object({
      id: z.string(),
      name: z.string(),
    }),
  }),
});

export type ApplicationReviewDetails = z.infer<
  typeof ApplicationReviewDetailsSchema
>;

export function getStudentReview(id: string) {
  return (instance: AxiosInstance) => {
    return request({
      instance,
      url: `/Student/self/CVs/reviews/${id}`,
      select: (response) => StudentReviewSchema.parseAsync(response.data),
    });
  };
}

export function getReviewAsCompany(id: string) {
  return (instance: AxiosInstance) => {
    return request({
      instance,
      url: `/Company/CVs/reviews/${id}`,
      select: (response) =>
        ApplicationReviewDetailsSchema.parseAsync(response.data),
    });
  };
}

export function useApplicationReviewQuery(id: string) {
  return useProtectedQuery(
    [studentReviewQueryKeyPart, id],
    getStudentReview(id),
    {
      enabled: id.length !== 0,
    }
  );
}

export function useReviewAsCompanyQuery(id: string) {
  return useProtectedQuery(["reviews", id], getReviewAsCompany(id), {
    enabled: id.length !== 0,
  });
}
