import { request } from "@/lib/axios";
import { parsePaginatedResponseAsync } from "../pagination";
import {
  AppliedCvsWithStudentSchema,
  JobOfferFeedSchema,
  JobOfferSchema,
} from "./schemas";
import { AxiosInstance } from "axios";
import { z } from "zod";
import { objectToFormData } from "@/lib/forms";

export function getJobOffers(
  instance: AxiosInstance,
  params: PaginatedRequestParams
) {
  return request({
    instance,
    url: "/Student/JobOffers",
    params,
    select: parsePaginatedResponseAsync(JobOfferFeedSchema),
  });
}

export function getRecommendedJobOffers(
  instance: AxiosInstance,
  params: PaginatedRequestParams
) {
  return request({
    instance,
    url: "/Student/JobOffers/recomended",
    params,
    select: parsePaginatedResponseAsync(JobOfferFeedSchema),
  });
}

export function getSelfJobOffersAsCompany(
  instance: AxiosInstance,
  params: PaginatedRequestParams
) {
  return request({
    instance,
    url: "/Company/self/JobOffers",
    params,
    select: parsePaginatedResponseAsync(JobOfferFeedSchema),
  });
}

export function getJobOfferAsCompany(jobOfferId: string) {
  return (instance: AxiosInstance) => {
    const data = request({
      instance,
      method: "GET",
      url: `Company/self/JobOffers/${jobOfferId}`,
      select: (res) => JobOfferSchema.parseAsync(res.data),
    });
    return data;
  };
}

export function getJobOfferAsStudent(jobOfferId: string) {
  return (instance: AxiosInstance) => {
    return request({
      instance,
      method: "GET",
      url: `Student/JobOffers/${jobOfferId}`,
      select: (res) => JobOfferSchema.parseAsync(res.data),
    });
  };
}

export function getJobOfferApplications(
  instance: AxiosInstance,
  { jobOfferId, ...params }: PaginatedRequestParams & { jobOfferId: string }
) {
  return request({
    instance,
    method: "GET",
    url: `Company/self/JobOffers/${jobOfferId}/CVs`,
    params,
    select: parsePaginatedResponseAsync(AppliedCvsWithStudentSchema),
  });
}

export function getJobOfferApplicationsAmountAsCompany(jobOfferId: string) {
  return (instance: AxiosInstance) => {
    return request({
      instance,
      method: "GET",
      url: `Company/self/JobOffers/${jobOfferId}/amount-applied-cvs`,
      select: (res) => z.number().parse(res.data),
    });
  };
}

export function unsubscribeStudentFromJobOffer(instance: AxiosInstance) {
  return (jobOfferId: string) => {
    return request({
      method: "DELETE",
      prefix: "Student",
      url: `JobOffers/${jobOfferId}/subscribe`,
      instance,
    });
  };
}

export function subscribeStudentToJobOffer(instance: AxiosInstance) {
  return (jobOfferId: string) => {
    return request({
      method: "POST",
      prefix: "Student",
      url: `JobOffers/${jobOfferId}/subscribe`,
      instance,
    });
  };
}

export function getSubscriptionOnJobOffer(instance: AxiosInstance) {
  return (jobOfferId: string) => {
    return request({
      method: "GET",
      prefix: "Student",
      url: `JobOffers/${jobOfferId}/subscribe`,
      instance,
    });
  };
}

export function createJobOffer(instance: AxiosInstance) {
  return async (data: JobOfferForm.JobOffer) => {
    const jobOfferId = await request<string>({
      method: "POST",
      url: "Company/self/JobOffers",
      instance,
      data,
    });

    if (data.image !== undefined) {
      try {
        await request({
          method: "POST",
          url: `Company/self/JobOffers/${jobOfferId}/image`,
          instance,
          data: objectToFormData({ file: data.image }),
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      } catch (_e) {
        // ignore
      }
    }
  };
}

export function updateJobOffer(instance: AxiosInstance) {
  return ({
    jobOfferId,
    ...data
  }: Omit<JobOfferForm.JobOffer, "image"> & { jobOfferId: string }) => {
    return request({
      method: "PUT",
      url: `Company/self/JobOffers/${jobOfferId}/detail`,
      instance,
      data,
    });
  };
}

export function updateJobOfferImage(instance: AxiosInstance) {
  return (data: { jobOfferId: string; image: File | null }) => {
    const formData = new FormData();
    formData.append("file", data.image ?? "");
    return request({
      method: "POST",
      url: `Company/self/JobOffers/${data.jobOfferId}/image`,
      instance,
      data: formData,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  };
}
