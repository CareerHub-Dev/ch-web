import { getStringInput } from "@/lib/string-input";
import { getArrayInput } from "@/lib/array-input/v2";
import { StudentCvDetails } from "@/lib/api/cvs/schemas";

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

export type WorkExperience = {
    title: string;
    companyName: string;
    jobType: string;
    workFormat: string;
    experienceLevel: string;
    jobLocation: string;
    startDate: string;
    endDate: string;
};

export type Education = {
    university: string;
    city: string;
    country: string;
    speciality: string;
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

export function restoreToCvQueryData(data: StudentCvDetails): CvData {
    const mappedEducations = data.educations.map((item) => {
        const { startDate, endDate, ...otherProperties } = item;
        const startYear = new Date(startDate).getFullYear().toString();
        const endYear = new Date(endDate).getFullYear().toString();

        return {
            startYear,
            endYear,
            isCurrent: item.endDate === null,
            ...otherProperties,
        };
    });

    return {
        ...data,
        workDirection: { value: null, wasChanged: false, wasBlurred: false },
        jobPosition: { value: null, wasChanged: false, wasBlurred: false },
        title: getStringInput({ value: data.title }),
        templateLanguage: matchTemplateLanguage(data.templateLanguage),
        firstName: getStringInput(),
        lastName: getStringInput(),
        goals: getStringInput({ value: data.goals }),
        workExperiences: getArrayInput({ initialItems: [] }),
        foreignLanguages: getArrayInput({
            initialItems: data.foreignLanguages,
        }),
        projectLinks: getArrayInput({ initialItems: data.projectLinks }),
        educations: getArrayInput({
            initialItems: mappedEducations,
        }),
        photo: data.photo,
        hardSkills: getArrayInput(),
        softSkills: getArrayInput(),
        experienceLevel: { value: null, wasChanged: false, wasBlurred: false },
    };
}

export function matchTemplateLanguage(val: string): TemplateLanguage {
    switch (val.toUpperCase()) {
        case "UA":
            return TEMPLATE_LANGUAGES[0]!;
        case "EN":
            return TEMPLATE_LANGUAGES[1]!;
        default:
            return TEMPLATE_LANGUAGES[0]!;
    }
}

export const TEMPLATE_LANGUAGES = [
    { id: "EN", name: "English" },
    { id: "UA", name: "Українська" },
];

export type TemplateLanguage = (typeof TEMPLATE_LANGUAGES)[number];

export const EXPERIENCE_LEVELS = [
    { id: "INTERN", name: "Intern" },
    { id: "TRAINEE", name: "Trainee" },
    { id: "JUNIOR", name: "Junior" },
    { id: "MIDDLE", name: "Middle" },
    { id: "SENIOR", name: "Senior" },
];

export type ExperienceLevel = (typeof EXPERIENCE_LEVELS)[number];
