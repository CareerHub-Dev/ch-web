import { type AxiosInstance } from 'axios';
import { request } from '../../axios';
import { parsePaginatedResponseAsync } from '../pagination';
import { CvsArraySchema } from './schemas';
import { objectToFormData } from '@/lib/forms';

type CvsRequestParams = Pick<PaginatedRequestParams, 'pageSize'> & {
  order?: string;
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

export const createCv =
  (body: {
    title: string;
    jobPositionId: string;
    templateLanguage: string;
    lastName: string;
    firstName: string;
    photo: File;
    goals: string;
    skillsAndTechnologies: string;
    experienceHighlights: string;
    foreignLanguages: Array<{ name: string; languageLevel: string }>;
    projectLinks: Array<{ title: string; url: string }>;
    educations: Array<{
      university: string;
      city: string;
      country: string;
      speciality: string;
      degree: string;
      startData: string;
      endDate: string;
    }>;
  }) =>
  (instance: AxiosInstance) =>
  () => {
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
