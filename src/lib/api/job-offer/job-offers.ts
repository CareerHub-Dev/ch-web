import { request } from "@/lib/axios";
import { parsePaginatedResponseAsync } from "../pagination";
import { JobOfferFeedSchema } from "./schemas";
import { AxiosInstance } from "axios";

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
