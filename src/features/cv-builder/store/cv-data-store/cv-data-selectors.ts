import { type StageNumber } from '../cv-ui-store/stages-slice';
import { type CvDataStore } from './cv-data-store';
import { type CvModificationData } from '@/lib/api/cvs';
import { getFileNameExtension } from '@/lib/images';

export type StageCompletionStatus =
  | 'complete'
  | 'hasErrors'
  | 'hasWarnings'
  | 'incomplete';

export const getStageCompletionStatus =
  (stage: StageNumber) =>
  (store: CvDataStore): StageCompletionStatus => {
    switch (stage) {
      case 0: {
        const jobPositionNotSpecified = !store.cvData.jobPosition;
        if (jobPositionNotSpecified) {
          return 'hasErrors';
        }
        return 'complete';
      }
      case 1:
        const { firstName, lastName } = store.cvData;
        return summarizeInputs(firstName, lastName);
      case 2:
        const { photo } = store.cvData;
        if (photo === null) return 'incomplete';
        return 'complete';
      case 3:
        const { goals } = store.cvData;
        return summarizeInputs(goals);
      case 4:
        const { skillsAndTechnologies } = store.cvData;
        return summarizeInputs(skillsAndTechnologies);
      case 5:
        const { foreignLanguages } = store.cvData;
        return summarizeInputs(foreignLanguages);
      case 6:
        const { experienceHighlights, projectLinks } = store.cvData;
        return summarizeInputs(experienceHighlights, projectLinks);
      case 7:
        const { educations } = store.cvData;
        return summarizeInputs(educations);
      default:
        return 'hasErrors';
    }
  };

export const getPhotoDetails = (store: CvDataStore) => {
  const { photo } = store.cvData;

  if (photo === null) return null;

  if (typeof photo === 'string') {
    return {
      type: 'imagePath' as const,
      path: photo,
    };
  }

  return {
    type: 'uploadedFile' as const,
    ...photo,
    extension: getFileNameExtension(photo.sourceFileName),
  };
};

export const getCvMutationData = (
  store: CvDataStore
): CvModificationData | null => {
  const { cvData } = store;
  const jobPositionId = cvData.jobPosition?.id;

  if (!jobPositionId) {
    return null;
  }

  let photo: File | undefined;
  if (
    cvData.photo !== null &&
    typeof cvData.photo === 'object' &&
    'croppedPhoto' in cvData.photo
  ) {
    photo = new File([cvData.photo.croppedPhoto], cvData.photo.sourceFileName, {
      type: cvData.photo.sourceFileType,
    });
  }

  return {
    title: cvData.title.value,
    jobPositionId,
    templateLanguage: cvData.templateLanguage.id,
    firstName: cvData.firstName.value,
    lastName: cvData.lastName.value,
    photo,
    goals: cvData.goals.value,
    skillsAndTechnologies: cvData.skillsAndTechnologies.value,
    experienceHighlights: cvData.experienceHighlights.value,
    foreignLanguages: cvData.foreignLanguages.items,
    projectLinks: cvData.projectLinks.items,
    educations: cvData.educations.items.map((item) => {
      const { startYear, endYear, ...otherProperties } = item;
      return {
        startDate: yearInputToIsoDate(startYear),
        endDate: yearInputToIsoDate(endYear),
        ...otherProperties,
      };
    }),
  };
};

const summarizeInputs = (
  ...inputs: Inputs.BaseInput[]
): StageCompletionStatus => {
  if (inputs.some((item) => item.errors.length > 0)) {
    return 'hasErrors';
  }
  if (inputs.some((item) => item.warnings.length > 0)) {
    return 'hasWarnings';
  }
  if (inputs.some((item) => !item.wasChanged)) {
    return 'incomplete';
  }
  return 'complete';
};

const yearInputToIsoDate = (input: string): string =>
  wrapYearInDate(parseInt(input)).toISOString();

const wrapYearInDate = (year: number): Date => {
  const date = new Date();
  date.setFullYear(year);
  return date;
};
