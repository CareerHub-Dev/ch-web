import { type AxiosInstance } from "axios";
import { request } from "../../axios";
import { parsePaginatedResponseAsync } from "../pagination";
import { CvDetailsSchema, CvsArraySchema } from "./schemas";
import { objectToFormData } from "@/lib/forms";
import { WorkExperience } from "@/features/work-experience/types";

type CvsRequestParams = Pick<PaginatedRequestParams, "pageSize"> & {
    order?: string;
};

export type CvModificationData = {
    experienceLevel: string;
    title: string;
    jobPositionId: string;
    templateLanguage: string;
    lastName: string;
    firstName: string;
    photo?: File;
    goals: string;
    hardSkills: Array<string>;
    softSkills: Array<string>;
    foreignLanguages: Array<{ name: string; languageLevel: string }>;
    projectLinks: Array<{ title: string; url: string }>;
    educations: Array<{
        university: string;
        city: string;
        country: string;
        speciality: string;
        degree: string;
        startDate: string;
        endDate: string;
    }>;
    experiences: Array<WorkExperience>;
};

export function getStudentOwnCvs(
    instance: AxiosInstance,
    params: CvsRequestParams
) {
    return request({
        instance,
        url: `/Student/self/CVs`,
        params,
        select: parsePaginatedResponseAsync(CvsArraySchema),
    });
}

export function getStudentOwnCv(cvId: string) {
    return (instance: AxiosInstance) =>
        request({
            instance,
            url: `/Student/self/CVs/${cvId}`,
            select: (response) => CvDetailsSchema.parseAsync(response.data),
        });
}

export function createCv(instance: AxiosInstance) {
    return (body: CvModificationData) => {
        const formData = objectToFormData(body);

        return request({
            method: "POST",
            prefix: "Student",
            url: "self/Cvs",
            data: formData,
            headers: {
                "Content-Type": "multipart/form-data",
            },
            instance,
        });
    };
}

export function modifyCv(instance: AxiosInstance) {
    return ({
        id,
        ...data
    }: Omit<CvModificationData, "photo"> & { id: string }) => {
        return request({
            method: "PUT",
            prefix: "Student",
            url: `self/Cvs/${id}`,
            data,
            instance,
        });
    };
}

export function modifyCvPhoto(instance: AxiosInstance) {
    return ({ id, photo }: { id: string; photo?: File }) => {
        const data = new FormData();
        data.append("file", photo ?? "");

        return request({
            method: "POST",
            prefix: "Student",
            url: `self/Cvs/${id}/photo`,
            data,
            instance,
        });
    };
}

export function deleteCv(instance: AxiosInstance) {
    return (id: string) =>
        request({
            method: "DELETE",
            prefix: "Student",
            url: `self/Cvs/${id}`,
            instance,
        });
}
