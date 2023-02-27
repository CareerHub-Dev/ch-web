import { type CvQueryData } from "@/hooks/useCvQuery";
import { type StudentCvDetails } from "@/lib/api/cvs/schemas";
import { arrayInputReducer, type ArrayInputAction } from "@/lib/array-input/v2";
import {
  makeStringInputReducer,
  type StringInputAction,
} from "@/lib/string-input";
import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import {
  getEmptyCvData,
  restoreToCvQueryData,
  WorkExperience,
  type CvData,
  type Education,
  type ForeignLanguage,
  type ProjectLink,
  type TemplateLanguage,
} from "./cv";

export type CvDataStore = {
  cvId: null | string;
  cvData: CvData;
  reInit: (newData: StudentCvDetails | null) => void;
  discardChanges: (lastSave: CvData | CvQueryData | null) => void;
  dispatchTitle: (value: StringInputAction) => void;
  changeTemplateLanguage: (value: TemplateLanguage) => void;
  changeJobPosition: (value: { id: string; name: string } | null) => void;
  blurJobPosition: () => void;
  changeWorkDirection: (value: { id: string; name: string } | null) => void;
  blurWorkDirection: () => void;
  changeExperienceLevel: (value: { id: string; name: string } | null) => void;
  blurExperienceLevel: () => void;
  dispatchFirstName: (action: StringInputAction) => void;
  dispatchLastName: (action: StringInputAction) => void;
  dispatchGoals: (action: StringInputAction) => void;
  dispatchWorkExperiences: (action: ArrayInputAction<WorkExperience>) => void;
  dispatchHardSkills: (action: ArrayInputAction<string>) => void;
  dispatchSoftSkills: (action: ArrayInputAction<string>) => void;
  dispatchForeignLanguages: (action: ArrayInputAction<ForeignLanguage>) => void;
  dispatchProjectLinks: (action: ArrayInputAction<ProjectLink>) => void;
  dispatchEducations: (action: ArrayInputAction<Education>) => void;
  changePhoto: (value: {
    croppedImage: Blob;
    sourceFileName: string;
    sourceFileType: string;
  }) => void;
  removePhoto: () => void;
  noWorkExperience: boolean;
  toggleNoWorkExperience: () => void;
  currentStage: StageNumber;
  goToStage: (num: StageNumber) => void;
};

export const useCvDataStore = create<CvDataStore>()(
  devtools(
    immer((set) => ({
      cvId: null,
      cvData: getEmptyCvData(),
      currentStage: 0,
      reInit: (newData) =>
        set((state) => {
          if (newData === null) {
            state.cvId = null;
            state.cvData = getEmptyCvData();
          } else {
            state.cvId = newData.id;
            state.cvData = restoreToCvQueryData(newData);
          }
        }),
      discardChanges: (lastSave) =>
        set((state) => {
          if (!lastSave) {
            state.cvData = getEmptyCvData();
            return;
          }
          if (typeof lastSave.title === "string") {
            state.cvData = restoreToCvQueryData(lastSave as CvQueryData);
          }
          state.cvData = lastSave as CvData;
        }),
      dispatchTitle: (action) =>
        set((state) => {
          state.cvData.title = titleReducer(state.cvData.title, action);
        }),
      changeJobPosition: (value) =>
        set((state) => {
          state.cvData.jobPosition = {
            value,
            wasChanged: true,
            wasBlurred: state.cvData.jobPosition.wasBlurred,
          };
        }),
      blurJobPosition: () =>
        set((state) => {
          state.cvData.jobPosition.wasBlurred = true;
        }),
      changeWorkDirection: (value) =>
        set((state) => {
          state.cvData.workDirection = {
            value,
            wasChanged: true,
            wasBlurred: state.cvData.workDirection.wasBlurred,
          };
        }),
      blurWorkDirection: () => {
        set((state) => {
          state.cvData.workDirection.wasBlurred = true;
        });
      },
      changeExperienceLevel: (value) =>
        set((state) => {
          state.cvData.experienceLevel = {
            value,
            wasChanged: true,
            wasBlurred: state.cvData.experienceLevel.wasBlurred,
          };
        }),
      blurExperienceLevel: () => {
        set((state) => {
          state.cvData.experienceLevel.wasBlurred = true;
        });
      },
      changeTemplateLanguage: (value) =>
        set((state) => {
          state.cvData.templateLanguage = value;
        }),
      dispatchFirstName: (action) =>
        set((state) => {
          state.cvData.firstName = firstNameReducer(
            state.cvData.firstName,
            action
          );
        }),
      dispatchLastName: (action) =>
        set((state) => {
          state.cvData.lastName = lastNameReducer(
            state.cvData.lastName,
            action
          );
        }),
      dispatchGoals: (action) =>
        set((state) => {
          state.cvData.goals = goalsReducer(state.cvData.goals, action);
        }),
      dispatchHardSkills: (action) =>
        set((state) => {
          state.cvData.hardSkills = arrayInputReducer({
            input: state.cvData.hardSkills,
            action,
            validators: [validateArrayInput],
          });
        }),
      dispatchWorkExperiences: (action) =>
        set((state) => {
          state.cvData.workExperiences = arrayInputReducer({
            input: state.cvData.workExperiences,
            action,
            validators: [validateArrayInput],
          });
        }),
      dispatchSoftSkills: (action) =>
        set((state) => {
          state.cvData.softSkills = arrayInputReducer({
            input: state.cvData.softSkills,
            action,
            validators: [validateArrayInput],
          });
        }),
      dispatchForeignLanguages: (action) =>
        set((state) => {
          state.cvData.foreignLanguages = arrayInputReducer({
            input: state.cvData.foreignLanguages,
            action,
            validators: [validateArrayInput],
          });
        }),
      dispatchProjectLinks: (action) =>
        set((state) => {
          state.cvData.projectLinks = arrayInputReducer({
            input: state.cvData.projectLinks,
            action,
            validators: [validateArrayInput],
          });
        }),
      dispatchEducations: (action) =>
        set((state) => {
          state.cvData.educations = arrayInputReducer({
            input: state.cvData.educations,
            action,
            validators: [validateArrayInput],
          });
        }),
      changePhoto: ({ croppedImage, sourceFileName, sourceFileType }) =>
        set((state) => {
          if (
            state.cvData.photo !== null &&
            typeof state.cvData.photo !== "string"
          ) {
            URL.revokeObjectURL(state.cvData.photo.croppedPhotoUrl);
          }
          state.cvData.photo = {
            sourceFileName,
            sourceFileType,
            croppedPhoto: croppedImage,
            croppedPhotoUrl: URL.createObjectURL(croppedImage),
          };
        }),
      removePhoto: () =>
        set((state) => {
          state.cvData.photo = null;
        }),
      noWorkExperience: false,
      toggleNoWorkExperience: () =>
        set((state) => {
          state.noWorkExperience = !state.noWorkExperience;
        }),
      goToStage: (num: StageNumber) => set({ currentStage: num }),
    }))
  )
);

export const CV_EDITOR_STAGES = [
  { id: 0, name: "Загальне" },
  { id: 1, name: "Ім'я, приізвище" },
  { id: 2, name: "Фото" },
  { id: 3, name: "Цілі" },
  { id: 4, name: "Навички" },
  { id: 5, name: "Мови" },
  { id: 6, name: "Досвід" },
  { id: 7, name: "Освіта" },
] as const;

export type StageNumber = (typeof CV_EDITOR_STAGES)[number]["id"];

const titleReducer = makeStringInputReducer([
  (val) =>
    val.length > 0
      ? { type: "success" }
      : {
          type: "error",
          message: "Назва не має бути порожнею",
        },
]);

const firstNameReducer = makeStringInputReducer([
  (val) =>
    val.length > 0
      ? { type: "success" }
      : {
          type: "error",
          message: "Ім'я не може бути порожнім",
        },
]);

const lastNameReducer = makeStringInputReducer([
  (val) =>
    val.length > 0
      ? { type: "success" }
      : {
          type: "error",
          message: "Прізвище не може бути порожнім",
        },
]);

const goalsReducer = makeStringInputReducer([
  valueIsNotEmpty,
  (val) =>
    val.length <= 200
      ? { type: "success" }
      : {
          type: "error",
          message: "Перевищено ліміт у 200 символів",
        },
]);

function validateArrayInput<T>(items: Array<T>) {
  if (items.length === 0)
    return {
      type: "warning",
      message: "Додайте хоча б один елемент",
    } as const;
  return { type: "success" } as const;
}

function valueIsNotEmpty(val: string) {
  if (val.length === 0)
    return { type: "warning", message: "Це поле краще заповнити" } as const;
  return { type: "success" } as const;
}
