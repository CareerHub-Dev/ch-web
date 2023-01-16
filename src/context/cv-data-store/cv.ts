import { type CvQueryData } from '@/hooks/useCvQuery';
import { getStringInput } from '@/lib/string-input/v2';
import { getArrayInput } from '@/lib/array-input/v2';

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
};

export function getEmptyCvData(): CvData {
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
  };
}

export function restoreToCvQueryData(data: CvQueryData): CvData {
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
  };
}

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
