import { type AxiosInstance } from 'axios';
import { request } from '../../axios';
import { parsePaginatedResponseAsync } from '../pagination';
import { CvDetailsSchema, CvsArraySchema } from './schemas';
import { objectToFormData } from '@/lib/forms';
import { WorkExperience } from '@/features/cv-builder/store/cv-data-store/cv';

type CvsRequestParams = Pick<PaginatedRequestParams, 'pageSize'> & {
  order?: string;
};

export type CvModificationData = {
  title: string;
  jobPositionId: string;
  templateLanguage: string;
  lastName: string;
  firstName: string;
  photo?: File;
  goals: string;
  skillsAndTechnologies: string;
  workExperiences: Array<WorkExperience>;
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
};

export const getStudentOwnCvs =
  (params: CvsRequestParams) => (instance: AxiosInstance) => {
    return request({
      instance,
      url: `/Student/self/CVs`,
      params,
      select: parsePaginatedResponseAsync(CvsArraySchema),
    });
  };

export const getStudentOwnCv = (cvId: string) => (instance: AxiosInstance) => {
  return request({
    instance,
    url: `/Student/self/CVs/${cvId}`,
    select: (response) => CvDetailsSchema.parseAsync(response.data),
  });
};

export const createCv =
  (instance: AxiosInstance) => (body: CvModificationData) => {
    const formData = objectToFormData(body);

    return request({
      method: 'POST',
      prefix: 'Student',
      url: 'self/Cvs',
      data: formData,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      instance,
    });
  };

export const modifyCv =
  (instance: AxiosInstance) =>
  ({ id, ...data }: Omit<CvModificationData, 'photo'> & { id: string }) => {
    return request({
      method: 'PUT',
      prefix: 'Student',
      url: `self/Cvs/${id}`,
      data,
      instance,
    });
  };

export const modifyCvPhoto =
  (instance: AxiosInstance) =>
  ({ id, photo }: { id: string; photo?: File }) => {
    const data = new FormData();
    data.append('file', photo ?? '');

    return request({
      method: 'POST',
      prefix: 'Student',
      url: `self/Cvs/${id}/photo`,
      data,
      instance,
    });
  };

export const deleteCv = (instance: AxiosInstance) => (id: string) => {
  return request({
    method: 'DELETE',
    prefix: 'Student',
    url: `self/Cvs/${id}`,
    instance,
  });
};
