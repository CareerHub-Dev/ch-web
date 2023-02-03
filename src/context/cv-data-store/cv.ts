import { getStringInput } from '@/lib/string-input/v2';
import { getArrayInput } from '@/lib/array-input/v2';
import { StudentCvDetails } from '@/lib/api/cvs/schemas';

type StringInput = Inputs.StringInput;
type ArrayInput<T> = Inputs.ArrayInput<T>;

export type ForeignLanguage = {
  name: string;
  languageLevel: string;
};

export type ProjectLink = {
  title: string;
  url: string;
};

export type Education = {
  university: string;
  city: string;
  country: string;
  speciality: string;
  degree: string;
  startYear: string;
  endYear: string;
};

export type CvData = {
  title: StringInput;
  templateLanguage: TemplateLanguage;
  jobPosition: null | {
    id: string;
    name: string;
  };
  firstName: StringInput;
  lastName: StringInput;
  goals: StringInput;
  skillsAndTechnologies: StringInput;
  experienceHighlights: StringInput;
  foreignLanguages: ArrayInput<ForeignLanguage>;
  projectLinks: ArrayInput<ProjectLink>;
  educations: ArrayInput<Education>;
  photo:
    | null
    | string
    | {
        sourceFileType: string;
        sourceFileName: string;
        croppedPhoto: Blob;
        croppedPhotoUrl: string;
      };
};

export const getEmptyCvData = (): CvData => {
  return {
    title: getStringInput(),
    templateLanguage: TEMPLATE_LANGUAGES[0]!,
    jobPosition: null,
    firstName: getStringInput(),
    lastName: getStringInput(),
    goals: getStringInput(),
    skillsAndTechnologies: getStringInput(),
    experienceHighlights: getStringInput(),
    foreignLanguages: getArrayInput(),
    projectLinks: getArrayInput(),
    educations: getArrayInput(),
    photo: null,
  };
};

export const restoreToCvQueryData = (data: StudentCvDetails): CvData => {
  const mappedEducations = data.educations.map((item) => {
    const { startDate, endDate, ...otherProperties } = item;
    const startYear = new Date(startDate).getFullYear().toString();
    const endYear = new Date(endDate).getFullYear().toString();

    return {
      startYear,
      endYear,
      ...otherProperties,
    };
  });

  return {
    ...data,
    title: getStringInput(data.title),
    templateLanguage: matchTemplateLanguage(data.templateLanguage),
    firstName: getStringInput(''),
    lastName: getStringInput(''),
    goals: getStringInput(data.goals),
    skillsAndTechnologies: getStringInput(data.skillsAndTechnologies),
    experienceHighlights: getStringInput(data.experienceHighlights),
    foreignLanguages: getArrayInput({ initialItems: data.foreignLanguages }),
    projectLinks: getArrayInput({ initialItems: data.projectLinks }),
    educations: getArrayInput({
      initialItems: mappedEducations,
    }),
    photo: null,
  };
};

export function matchTemplateLanguage(val: string): TemplateLanguage {
  switch (val.toUpperCase()) {
    case 'UA':
      return TEMPLATE_LANGUAGES[0]!;
    case 'EN':
      return TEMPLATE_LANGUAGES[1]!;
    default:
      return TEMPLATE_LANGUAGES[0]!;
  }
}

export const TEMPLATE_LANGUAGES = [
  { id: 'UA', name: 'Українська' },
  { id: 'EN', name: 'English' },
];

export type TemplateLanguage = typeof TEMPLATE_LANGUAGES[number];
