import { request } from "@/lib/axios";
import { AxiosInstance } from "axios";
import { useProtectedQuery } from "@/hooks/useProtectedQuery";
import {
  StudentReviewSchema,
  studentReviewQueryKeyPart,
} from "./use-student-reviews-query";
import { z } from "zod";
import { ReviewStatus } from "@/lib/enums";
import useProtectedMutation from "@/hooks/useProtectedMutation";
import parseUnknownError from "@/lib/parse-unknown-error";
import useToast from "@/hooks/useToast";
import { useQueryClient } from "@tanstack/react-query";

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

export function rejectStudentApplication(instance: AxiosInstance) {
  return ({ reviewId, message }: { reviewId: string; message: string }) => {
    return request({
      instance,
      url: `/Company/CVs/reviews/${reviewId}`,
      method: "PUT",
      data: {
        status: ReviewStatus.Rejected,
        message,
      },
    });
  };
}

export function acceptStudentApplication(instance: AxiosInstance) {
  return ({ reviewId, message }: { reviewId: string; message: string }) => {
    return request({
      instance,
      url: `/Company/CVs/reviews/${reviewId}`,
      method: "PUT",
      data: {
        status: ReviewStatus.Success,
        message,
      },
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

export function useRejectStudentApplicationMutation() {
  const toast = useToast();
  const client = useQueryClient();
  return useProtectedMutation(
    ["reject-application"],
    rejectStudentApplication,
    {
      onSuccess: async (_data, variables) => {
        const applicationSpecificQueryKey = [
          "reviews",
          variables.reviewId,
        ];

        await client.cancelQueries(applicationSpecificQueryKey);
        const cachedData = client.getQueryData<ApplicationReviewDetails>(
          applicationSpecificQueryKey
        );
        if (cachedData) {
          const newData = structuredClone(cachedData);
          newData.status = ReviewStatus.Rejected;
          newData.message = variables.message;
          client.setQueryData<ApplicationReviewDetails>(
            applicationSpecificQueryKey,
            newData
          );
        }
        client.invalidateQueries(applicationSpecificQueryKey);
        client.invalidateQueries(["job-offer-applications"]);
      },
      onError: (err) => {
        toast.error(parseUnknownError(err));
      },
    }
  );
}

export function useAcceptStudentApplicationMutation() {
  const toast = useToast();
  const client = useQueryClient();
  return useProtectedMutation(
    ["accept-application"],
    acceptStudentApplication,
    {
      onSuccess: async (_data, variables) => {
        const applicationSpecificQueryKey = [
          "reviews",
          variables.reviewId,
        ];

        await client.cancelQueries(applicationSpecificQueryKey);
        const cachedData = client.getQueryData<ApplicationReviewDetails>(
          applicationSpecificQueryKey
        );
        if (cachedData) {
          const newData = structuredClone(cachedData);
          newData.status = ReviewStatus.Success;
          newData.message = variables.message;
          client.setQueryData<ApplicationReviewDetails>(
            applicationSpecificQueryKey,
            newData
          );
        }
        client.invalidateQueries(applicationSpecificQueryKey);
        client.invalidateQueries(["job-offer-applications"]);
      },
      onError: (err) => {
        toast.error(parseUnknownError(err));
      },
    }
  );
}
