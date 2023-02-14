import { type StageNumber } from "../cv-data-store";
import { type CvDataStore } from "./cv-data-store";
import { type CvModificationData } from "@/lib/api/cvs";
import { getFileNameExtension } from "@/lib/images";
import { createStringInputReducerActions } from "@/lib/string-input";
import { DEFAULT_JOB_POSITION, Education } from "./cv";

export type StageCompletionStatus =
  | "complete"
  | "hasErrors"
  | "hasWarnings"
  | "incomplete";

export function getStageAccessibility(stage: StageNumber) {
  return (store: CvDataStore) => {
    const { cvData } = store;
    switch (stage) {
      case 0:
        return { status: "accessible" } as const;
      default:
        if (cvData.jobPosition.value.id === DEFAULT_JOB_POSITION.id) {
          return {
            status: "inaccessible",
            reason: "Не обрано напрямок роботи",
          } as const;
        }
        return { status: "accessible" } as const;
    }
  };
}

export function getTitleActions(store: CvDataStore) {
  return createStringInputReducerActions(store.dispatchTitle);
}

export function getFirstNameActions(store: CvDataStore) {
  return createStringInputReducerActions(store.dispatchFirstName);
}

export function getLastNameActions(store: CvDataStore) {
  return createStringInputReducerActions(store.dispatchLastName);
}

export function getGoalsActions(store: CvDataStore) {
  return createStringInputReducerActions(store.dispatchGoals);
}

export function getExperienceHighlightsActions(store: CvDataStore) {
  return createStringInputReducerActions(store.dispatchExperienceHighlights);
}

export function getStageCompletionStatus(stage: StageNumber) {
  return (store: CvDataStore): StageCompletionStatus => {
    switch (stage) {
      case 0: {
        const jobPositionNotSpecified =
          store.cvData.jobPosition.value.id === DEFAULT_JOB_POSITION.id;
        if (jobPositionNotSpecified) {
          return "hasErrors";
        }
        return "complete";
      }
      case 1:
        const { firstName, lastName } = store.cvData;
        return summarizeInputs(firstName, lastName);
      case 2:
        const { photo } = store.cvData;
        if (photo === null) return "incomplete";
        return "complete";
      case 3:
        const { goals } = store.cvData;
        return summarizeInputs(goals);
      case 4:
        const { hardSkills, softSkills } = store.cvData;
        return summarizeInputs(hardSkills, softSkills);
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
        return "hasErrors";
    }
  };
}

export function getPhotoDetails(store: CvDataStore) {
  const { photo } = store.cvData;

  if (photo === null) return null;

  if (typeof photo === "string") {
    return {
      type: "imagePath" as const,
      path: photo,
    };
  }

  return {
    type: "uploadedFile" as const,
    ...photo,
    extension: getFileNameExtension(photo.sourceFileName),
  };
}

export function getCvMutationData(
  store: CvDataStore
): CvModificationData | null {
  const { cvData } = store;
  const jobPositionId = cvData.jobPosition.value.id;

  let photo: File | undefined;
  if (
    cvData.photo !== null &&
    typeof cvData.photo === "object" &&
    "croppedPhoto" in cvData.photo
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
    experienceHighlights: cvData.experienceHighlights.value,
    foreignLanguages: cvData.foreignLanguages.items,
    projectLinks: cvData.projectLinks.items,
    educations: cvData.educations.items.map(educationToPlainObject),
    skillsAndTechnologies: "",
  };
}

function summarizeInputs(...inputs: Inputs.BaseInput[]) {
  if (inputs.some((item) => item.errors.length > 0)) {
    return "hasErrors" as const;
  }
  if (inputs.some((item) => item.warnings.length > 0)) {
    return "hasWarnings" as const;
  }
  if (inputs.some((item) => !item.wasChanged)) {
    return "incomplete" as const;
  }
  return "complete" as const;
}

function educationToPlainObject(val: Education) {
  const { startYear, endYear, ...otherProperties } = val;
  return {
    startDate: yearInputToIsoDate(startYear),
    endDate: yearInputToIsoDate(endYear),
    ...otherProperties,
  };
}

function yearInputToIsoDate(input: string): string {
  return wrapYearInDate(parseInt(input)).toISOString();
}

function wrapYearInDate(year: number): Date {
  const date = new Date();
  date.setFullYear(year);
  return date;
}
