import { getStringInput } from "@/lib/string-input";
import { getArrayInput } from "@/lib/array-input/v2";
import { WorkExperience } from "@/features/work-experience/types";
import { CvDetails } from "@/features/student-cvs/hooks/use-cv-details-query";
import { ExperienceLevel } from "@/lib/enums";
import { EXPERIENCE_LEVELS } from "../../components/mocks/job-directions";

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
  specialty: string;
  degree: string;
  startYear: string;
  endYear: string;
  isCurrent: boolean;
};

export type CvData = {
  title: StringInput;
  templateLanguage: TemplateLanguage;
  workDirection: {
    wasChanged: boolean;
    wasBlurred: boolean;
    value: {
      id: string;
      name: string;
      recomendedTemplateLanguage: string;
    } | null;
  };
  jobPosition: {
    wasChanged: boolean;
    wasBlurred: boolean;
    value: {
      id: string;
      name: string;
    } | null;
  };
  experienceLevel: {
    wasChanged: boolean;
    wasBlurred: boolean;
    value: {
      id: string;
      name: string;
    } | null;
  };
  firstName: StringInput;
  lastName: StringInput;
  goals: StringInput;
  hardSkills: ArrayInput<string>;
  softSkills: ArrayInput<string>;
  workExperiences: ArrayInput<WorkExperience>;
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

export function getEmptyCvData(): CvData {
  return {
    title: getStringInput(),
    templateLanguage: TEMPLATE_LANGUAGES[0]!,
    workDirection: { value: null, wasChanged: false, wasBlurred: false },
    experienceLevel: { value: null, wasChanged: false, wasBlurred: false },
    jobPosition: { value: null, wasChanged: false, wasBlurred: false },
    firstName: getStringInput(),
    lastName: getStringInput(),
    goals: getStringInput(),
    hardSkills: getArrayInput(),
    softSkills: getArrayInput(),
    workExperiences: getArrayInput(),
    foreignLanguages: getArrayInput(),
    projectLinks: getArrayInput(),
    educations: getArrayInput(),
    photo: null,
  };
}

export function restoreToCvQueryData(data: CvDetails): CvData {
  const mappedEducations = data.educations.map((item) => {
    const { startDate, endDate, ...otherProperties } = item;
    const startYear = new Date(startDate).getFullYear().toString();
    const endDateObject = endDate ? new Date(endDate) : new Date();
    const endYear = endDateObject.getFullYear().toString();

    return {
      startYear,
      endYear,
      isCurrent: item.endDate === null,
      ...otherProperties,
    };
  });

  return {
    ...data,
    jobPosition: {
      value: data.jobPosition,
      wasChanged: false,
      wasBlurred: false,
    },
    workDirection: {
      value: {
        ...data.jobDirection,
        recomendedTemplateLanguage: matchTemplateLanguage(data.templateLanguage)
          .id,
      },
      wasChanged: false,
      wasBlurred: false,
    },
    title: getStringInput({
      value: data.title,
      wasChanged: true,
      wasBlurred: true,
    }),
    templateLanguage: matchTemplateLanguage(data.templateLanguage),
    firstName: getStringInput({
      value: data.firstName,
      wasChanged: true,
      wasBlurred: true,
    }),
    lastName: getStringInput({
      value: data.lastName,
      wasChanged: true,
      wasBlurred: true,
    }),
    goals: getStringInput({
      value: data.goals,
      wasChanged: true,
      wasBlurred: true,
    }),
    // TODO: handle workExperiences transformation
    workExperiences: getArrayInput({ initialItems: [] }),
    foreignLanguages: getArrayInput({
      initialItems: data.foreignLanguages,
    }),
    projectLinks: getArrayInput({ initialItems: data.projectLinks }),
    educations: getArrayInput({
      initialItems: mappedEducations,
    }),
    photo: data.photo ?? null,
    hardSkills: getArrayInput(),
    softSkills: getArrayInput(),
    experienceLevel: {
      value: experienceLevelToOption(
        matchExperienceLevel(data.experienceLevel)
      ),
      wasChanged: false,
      wasBlurred: false,
    },
  };
}

export function matchTemplateLanguage(val: string): TemplateLanguage {
  switch (val.toUpperCase()) {
    case "UA":
      return TEMPLATE_LANGUAGES[1]!;
    case "EN":
      return TEMPLATE_LANGUAGES[0]!;
    default:
      return TEMPLATE_LANGUAGES[0]!;
  }
}

export function matchExperienceLevel(val: string): ExperienceLevel {
  switch (val.toUpperCase()) {
    case "TRAINEE":
      return ExperienceLevel.Trainee;
    case "INTERN":
      return ExperienceLevel.Intern;
    case "JUNIOR":
      return ExperienceLevel.Junior;
    case "MIDDLE":
      return ExperienceLevel.Middle;
    case "SENIOR":
      return ExperienceLevel.Senior;
    default:
      return ExperienceLevel.Trainee;
  }
}

export function experienceLevelToOption(val: ExperienceLevel): {
  id: string;
  name: string;
} {
  return (
    EXPERIENCE_LEVELS.find((item) => item.id === val) ?? EXPERIENCE_LEVELS[0]!
  );
}

export const TEMPLATE_LANGUAGES = [
  { id: "EN", name: "English" },
  { id: "UA", name: "Українська" },
];

export type TemplateLanguage = (typeof TEMPLATE_LANGUAGES)[number];
