import { parsePaginatedResponseAsync } from "@/lib/api/pagination";
import { request } from "@/lib/axios";
import { AxiosInstance } from "axios";
import { useProtectedPaginatedQuery } from "@/hooks/useProtectedPaginatedQuery";
import { z } from "zod";

export const StudentReviewSchema = z.object({
  id: z.string(),
  status: z.string(),
  message: z.string().nullable(),
  created: z.string(),
  cv: z.object({
    id: z.string(),
    title: z.string(),
    created: z.string(),
    modified: z.string().nullish(),
  }),
  jobOffer: z.object({
    id: z.string(),
    title: z.string(),
    image: z.string().nullish(),
  }),
});

export type StudentApplicationReview = z.infer<typeof StudentReviewSchema>;

export const studentReviewQueryKeyPart = "student-reviews";

export function getStudentReviews(
  instance: AxiosInstance,
  params: Omit<PaginatedRequestParams, "pageNumber">
) {
  return request({
    instance,
    url: "/Student/self/CVs/reviews",
    params,
    select: parsePaginatedResponseAsync(z.array(StudentReviewSchema)),
  });
}

export function useStudentReviewsQuery() {
  return useProtectedPaginatedQuery({
    queryKey: [studentReviewQueryKeyPart],
    getItems: getStudentReviews,
    params: {
      pageSize: 36,
      order: "created DESC",
    },
  });
}
