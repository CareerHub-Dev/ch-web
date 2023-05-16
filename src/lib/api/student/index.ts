import { request } from "../../axios";
import { z } from "zod";
import StudentSchema, { StudentArraySchema } from "../../schemas/Student";
import {
    CompanySubscriptionsArraySchema,
    StudentSubscribersArraySchema,
    StudentSubscriptionsArraySchema,
} from "./schemas";
import { JobOfferArraySchema } from "../../schemas/JobOffer";
import { parsePaginatedResponseAsync } from "../pagination";
import { type AxiosInstance, type AxiosResponse } from "axios";

async function parseStudentAsync(response: AxiosResponse) {
    return StudentSchema.parseAsync(response.data);
}

export function getStudent(accountId: string) {
    return (instance: AxiosInstance) =>
        request({
            instance,
            url: `Student/Students/${accountId}`,
            select: parseStudentAsync,
        });
}

export function getStudents(
    instance: AxiosInstance,
    params: Omit<PaginatedRequestParams, "pageNumber">
) {
    return request({
        instance,
        url: "Student/Students",
        select: parsePaginatedResponseAsync(StudentArraySchema),
        params,
    });
}

export function getSelfStudent(instance: AxiosInstance) {
    return request({
        instance,
        url: "Student/Students/self",
        select: parseStudentAsync,
    });
}

export const getStudentSubscriptionsAmount =
    (subscriptionType: string) =>
    (accountId: string) =>
    (instance: AxiosInstance) =>
        request({
            instance,
            url: `/Student/Students/${accountId}/amount-${subscriptionType}-subscriptions`,
            select: (response: AxiosResponse) =>
                z.number().parse(response.data),
        });

export const getStudentStudentSubscriptionsAmount =
    getStudentSubscriptionsAmount("student");
export const getStudentCompanySubscriptionsAmount =
    getStudentSubscriptionsAmount("company");
export const getStudentJobOfferSubscriptionsAmount =
    getStudentSubscriptionsAmount("jobOffer");

export function getStudentStudentSubscribersAmount(accountId: string) {
    return (instance: AxiosInstance) =>
        request({
            instance,
            url: `/Student/Students/${accountId}/amount-student-subscribers`,
            select: (response: AxiosResponse) =>
                z.number().parse(response.data),
        });
}

export function updateStudentGeneralInfo(instance: AxiosInstance) {
    return (data: {
        firstName: string;
        lastName: string;
        birthDate?: string | null;
        phone?: string | null;
        studentGroupId: string;
    }) =>
        request({
            instance,
            url: `/Student/Students/self/detail`,
            method: "PUT",
            data,
        });
}

export function updateStudentPhoto(instance: AxiosInstance) {
    return (file?: File) => {
        const data = new FormData();
        data.append("file", file ?? "undefined");

        return request({
            instance,
            url: `/Student/Students/self/photo`,
            method: "POST",
            headers: {
                "Content-Type": "multipart/form-data",
            },
            data,
        });
    };
}

export function getStudentCvs(accountId: string) {
    return (instance: AxiosInstance) =>
        request({
            instance,
            url: `/Student/Students/${accountId}/Cvs`,
        });
}

export type StudentSubscriptionsParams = Omit<PaginatedRequestParams, "pageNumber"> & {
    accountId: string;
};

export function getStudentStudentSubscriptions(
    instance: AxiosInstance,
    params: StudentSubscriptionsParams
) {
    const { accountId, ...rest } = params;
    return request({
        instance,
        url: `/Student/Students/${accountId}/student-subscriptions`,
        params: rest,
        select: parsePaginatedResponseAsync(StudentSubscriptionsArraySchema),
    });
}

export function getStudentStudentSubscribers(
    instance: AxiosInstance,
    params: StudentSubscriptionsParams
) {
    const { accountId, ...rest } = params;
    return request({
        instance,
        url: `/Student/Students/${accountId}/student-subscribers`,
        params: rest,
        select: parsePaginatedResponseAsync(StudentSubscribersArraySchema),
    });
}

export function getStudentCompanySubscriptions(
    instance: AxiosInstance,
    params: StudentSubscriptionsParams
) {
    const { accountId, ...rest } = params;
    return request({
        instance,
        url: `/Student/Students/${accountId}/company-subscriptions`,
        params: rest,
        select: parsePaginatedResponseAsync(CompanySubscriptionsArraySchema),
    });
}

export function getStudentJobOfferSubscriptions(
    instance: AxiosInstance,
    params: StudentSubscriptionsParams
) {
    const { accountId, ...rest } = params;
    return request({
        instance,
        url: `/Student/Students/${accountId}/jobOffer-subscriptions`,
        params: rest,
        select: parsePaginatedResponseAsync(JobOfferArraySchema),
    });
}

export function getStudentStudentSubscriptionState(studentId: string) {
    return (instance: AxiosInstance) => {
        return request({
            instance,
            url: `/Student/Students/${studentId}/subscribe`,
            method: "GET",
            select: (response: AxiosResponse) =>
                z.boolean().parse(response.data),
        });
    };
}

export function unsubscribeStudentFromStudent(instance: AxiosInstance) {
    return (studentId: string) => {
        return request({
            instance,
            url: `/Student/Students/${studentId}/subscribe`,
            method: "DELETE",
        });
    };
}

export function subscribeToStudent(instance: AxiosInstance) {
    return (studentId: string) => {
        return request({
            instance,
            url: `/Student/Students/${studentId}/subscribe`,
            method: "POST",
        });
    };
}
