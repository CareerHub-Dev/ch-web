import { z } from "zod";
import { request } from "@/lib/axios";
import { parsePaginatedResponseAsync } from "../pagination";
import {
  CompanyInFeedArraySchema,
  CompanyDetailsSchema,
  CompanyJobOffersArraySchema,
} from "./schemas";
import { AxiosInstance } from "axios";
import { CompanyLink } from "@/features/company-profile-edit/components/CompanyLink";

export function getCompanies(
  instance: AxiosInstance,
  params: Omit<PaginatedRequestParams, "pageNumber">
) {
  return request({
    instance,
    prefix: "Student",
    url: "Companies",
    params,
    select: parsePaginatedResponseAsync(CompanyInFeedArraySchema),
  });
}

export function getCompany(companyId: string) {
  return (instance: AxiosInstance) =>
    request({
      instance,
      prefix: "Student",
      url: `Companies/${companyId}`,
      select: (res) => CompanyDetailsSchema.parseAsync(res.data),
    });
}

export function getCompanySelf(instance: AxiosInstance) {
  return request({
    instance,
    url: "Company/Companies/self",
    select: (res) => CompanyDetailsSchema.parseAsync(res.data),
  });
}

export function getCompanySelfJobOffersAmount(instance: AxiosInstance) {
  return request({
    instance,
    url: "Company/Companies/self/amount-jobOffers",
    select: (res) => z.number().parseAsync(res.data),
  });
}

export function getCompanySelfSubscribersAmount(instance: AxiosInstance) {
  return request({
    instance,
    url: "Company/Companies/self/amount-subscribers",
    select: (res) => z.number().parseAsync(res.data),
  });
}

export function getCompanyJobOffers(
  instance: AxiosInstance,
  {
    companyId,
    ...params
  }: Omit<PaginatedRequestParams, "pageNumber"> & {
    companyId: string;
  }
) {
  let url = `Student/Companies/${companyId}/JobOffers`;
  if (companyId === "self") {
    url = "Company/self/JobOffers";
  }
  return request({
    instance,
    url,
    params,
    select: parsePaginatedResponseAsync(CompanyJobOffersArraySchema),
  });
}

function doOnCompanySubscription(method: "POST" | "DELETE") {
  return (companyId: string) => (instance: AxiosInstance) => () => {
    return request({
      method,
      prefix: "Student",
      url: `Companies/${companyId}/subscribe`,
      instance,
    });
  };
}

export const changeCompanySubscriptionStatus = (currentlySubscribed: boolean) =>
  currentlySubscribed
    ? doOnCompanySubscription("DELETE")
    : doOnCompanySubscription("POST");

export const unsubscribeStudentFromCompanyById =
  (instance: AxiosInstance) => (companyId: string) =>
    doOnCompanySubscription("DELETE")(companyId)(instance)();
export const unsubscribeStudentFromCompany = doOnCompanySubscription("DELETE");
export const subscribeStudentToCompany = doOnCompanySubscription("POST");
export const getSubscriptionOnCompany =
  (companyId: string) => (instance: AxiosInstance) => {
    return request({
      method: "GET",
      prefix: "Student",
      url: `Companies/${companyId}/subscribe`,
      instance,
    });
  };

function getCompanyStat(stat: "subscribers" | "jobOffers") {
  return (companyId: string) => (instance: AxiosInstance) =>
    request({
      instance,
      prefix: "Student",
      url: `Companies/${companyId}/amount-${stat}`,
      select: (res) => z.number().parseAsync(res.data),
    });
}

export const getCompanySubscribersAmount = getCompanyStat("subscribers");
export const getCompanyJobOffersAmount = getCompanyStat("jobOffers");

export function getSelfCompany(instance: AxiosInstance) {
  return request({
    instance,
    prefix: "Company",
    url: "Companies/self",
    select: (res) => CompanyDetailsSchema.parseAsync(res.data),
  });
}

export function editCompanyDetail(instance: AxiosInstance) {
  return (data: { name: string; motto: string; description: string }) =>
    request({
      instance,
      url: "Company/Companies/self/detail",
      method: "PUT",
      data,
    });
}

export function editCompanyLinks(instance: AxiosInstance) {
  return (links: CompanyLink[]) =>
    request({
      instance,
      url: "Company/Companies/self/Links",
      method: "PUT",
      data: { links },
    });
}

export function updateCompanyLogo(instance: AxiosInstance) {
  return (file?: File) => {
    const data = new FormData();
    data.append("file", file ?? "undefined");

    return request({
      instance,
      url: `Company/Companies/self/logo`,
      method: "POST",
      headers: {
        "Content-Type": "multipart/form-data",
      },
      data,
    });
  };
}

export function updateCompanyBanner(instance: AxiosInstance) {
  return (file?: File) => {
    const data = new FormData();
    data.append("file", file ?? "undefined");

    return request({
      instance,
      url: `Company/Companies/self/banner`,
      method: "POST",
      headers: {
        "Content-Type": "multipart/form-data",
      },
      data,
    });
  };
}
