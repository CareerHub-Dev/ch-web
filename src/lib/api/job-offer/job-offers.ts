import { request } from "@/lib/axios";
import { parsePaginatedResponseAsync } from "../pagination";
import {
    AppliedCvsSchema,
    JobOfferFeedSchema,
    JobOfferSchema,
} from "./schemas";
import { AxiosInstance } from "axios";
import { z } from "zod";

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

export function getJobOfferAsCompany(jobOfferId: string) {
    return (instance: AxiosInstance) => {
        return request({
            instance,
            method: "GET",
            url: `Company/self/JobOffers/${jobOfferId}`,
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
        select: parsePaginatedResponseAsync(AppliedCvsSchema),
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
    return (data: JobOfferForm.JobOffer) => {
        return request({
            method: "POST",
            url: "Company/self/JobOffers",
            instance,
            data,
        });
    };
}
