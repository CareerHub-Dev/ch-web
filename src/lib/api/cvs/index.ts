import { type AxiosInstance } from "axios";
import { request } from "../../axios";
import { parsePaginatedResponseAsync } from "../pagination";
import { CvsArraySchema } from "./schemas";
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
    specialty: string;
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

// function formDataFromCvModificationData(data: CvModificationData) {
//   const formData = new FormData();
//   formData.append("experienceLevel", data.experienceLevel);
//   formData.append("title", data.title);
//   formData.append("jobPositionId", data.jobPositionId);
//   formData.append("templateLanguage", data.templateLanguage);
//   formData.append("lastName", data.lastName);
//   formData.append("firstName", data.firstName);
//   formData.append("goals", data.goals);
//   data.hardSkills.forEach((skill) => {
//     formData.append("hardSkills", skill);
//   });
//   data.softSkills.forEach((skill) => {
//     formData.append("softSkills", skill);
//   });
//   data.foreignLanguages.forEach((language) => {
//     formData.append("foreignLanguages", JSON.stringify(language));
//   });
//   data.projectLinks.forEach((link) => {
//     formData.append("projectLinks", JSON.stringify(link));
//   });
//   data.educations.forEach((education) => {
//     formData.append("educations", JSON.stringify(education));
//   });
//   data.experiences.forEach((experience) => {
//     formData.append("experiences", JSON.stringify(experience));
//   });
//   return formData;
// }

export function createOrModifyCv(instance: AxiosInstance) {
  return async ({
    id,
    photo,
    ...data
  }: CvModificationData & { id: string | null }) => {
    if (id === null) {
      id = await request({
        method: "POST",
        url: "Student/self/CVs/without-photo",
        data,
        instance,
      });
    } else {
      await request({
        method: "PUT",
        url: `Student/self/CVs/${id}`,
        data,
        instance,
      });
    }
    try {
      const formData = new FormData();
      formData.append("file", photo ?? "");

      await request({
        method: "POST",
        url: `Student/self/CVs/${id}/photo`,
        data,
        instance,
      });
    } catch (_e) {
      // TODO: handle possible errors with image post
    }
  };
}

export function createCv(instance: AxiosInstance) {
  return async ({ photo, ...data }: CvModificationData) => {
    const cvId: string = await request({
      method: "POST",
      url: "Student/self/CVs/without-photo",
      data,
      instance,
    });

    try {
      if (photo !== undefined) {
        const formData = new FormData();
        formData.append("file", photo);
        await request({
          method: "POST",
          url: `Student/self/CVs/${cvId}/photo`,
          data: formData,
          headers: {
            "Content-Type": "multipart/form-data",
          },
          instance,
        });
      }
    } catch (_e) {
      // TODO: handle possible errors with image post
    }

    return cvId;
  };
}

export function modifyCv(instance: AxiosInstance) {
  return async ({
    id,
    photo,
    ...data
  }: CvModificationData & { id: string }) => {
    await request({
      method: "PUT",
      url: `Student/self/Cvs/${id}`,
      data,
      instance,
    });

    const formData = new FormData();
    formData.append("file", photo ?? "");

    await request({
      method: "POST",
      url: `Student/self/Cvs/${id}/photo`,
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
