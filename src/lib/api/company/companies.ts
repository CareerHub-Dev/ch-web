import { z } from "zod";
import { request } from "@/lib/axios";
import { parsePaginatedResponseAsync } from "../pagination";
import {
  CompanyInFeedArraySchema,
  CompanyDetailsSchema,
  CompanyJobOffersArraySchema,
  CompanyBriefSchema,
} from "./schemas";

import { type AxiosInstance } from "axios";

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

export function getCompanyJobOffers(
  instance: AxiosInstance,
  {
    companyId,
    ...params
  }: Omit<PaginatedRequestParams, "pageNumber"> & {
    companyId: string;
  }
) {
  return request({
    instance,
    prefix: "Student",
    url: `Companies/${companyId}/JobOffers`,
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
    select: (res) => CompanyBriefSchema.parseAsync(res.data),
  });
}
