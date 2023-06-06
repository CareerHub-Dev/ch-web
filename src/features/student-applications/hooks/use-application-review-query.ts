import { request } from "@/lib/axios";
import { AxiosInstance } from "axios";
import { useProtectedQuery } from "@/hooks/useProtectedQuery";
import {
  StudentReviewSchema,
  studentReviewQueryKeyPart,
} from "./use-student-reviews-query";

export function getStudentReview(id: string) {
  return (instance: AxiosInstance) => {
    return request({
      instance,
      url: `/Student/self/CVs/reviews/${id}`,
      select: (response) => StudentReviewSchema.parseAsync(response.data),
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
