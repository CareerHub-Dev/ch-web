import { type CvQueryData } from '@/hooks/useCvQuery';
import { getStringInput } from '@/lib/string-input/v2';

type StringInput = Inputs.StringInput;

export type CvData = {
  title: StringInput;
  templateLanguage: TemplateLanguage;
  jobPosition: null | {
    id: string;
    name: string;
  };
  firstName: StringInput;
  lastName: StringInput;
};

export function getEmptyCvData(): CvData {
  return {
    title: getStringInput(),
    templateLanguage: TEMPLATE_LANGUAGES[0]!,
    jobPosition: null,
    firstName: getStringInput(),
    lastName: getStringInput(),
  };
}

export function restoreToCvQueryData(data: CvQueryData): CvData {
  return {
    ...data,
    title: getStringInput(data.title),
    templateLanguage: matchTemplateLanguage(data.templateLanguage),
    firstName: getStringInput(''),
    lastName: getStringInput(''),
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
