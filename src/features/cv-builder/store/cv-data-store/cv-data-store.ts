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
  changeJobPosition: (value: { id: string; name: string }) => void;
  clickJobPosition: () => void;
  dispatchFirstName: (action: StringInputAction) => void;
  dispatchLastName: (action: StringInputAction) => void;
  dispatchGoals: (action: StringInputAction) => void;
  dispatchSkillsAndTechnologies: (action: StringInputAction) => void;
  dispatchExperienceHighlights: (action: StringInputAction) => void;
  dispatchForeignLanguages: (action: ArrayInputAction<ForeignLanguage>) => void;
  dispatchProjectLinks: (action: ArrayInputAction<ProjectLink>) => void;
  dispatchEducations: (action: ArrayInputAction<Education>) => void;
  changePhoto: (value: {
    croppedImage: Blob;
    sourceFileName: string;
    sourceFileType: string;
  }) => void;
  removePhoto: () => void;
};

export const useCvDataStore = create<CvDataStore>()(
  devtools(
    immer((set) => ({
      cvId: null,
      cvData: getEmptyCvData(),
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
          state.cvData.jobPosition = { value, wasClicked: true };
        }),
      clickJobPosition: () =>
        set((state) => {
          state.cvData.jobPosition.wasClicked = true;
        }),
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
      dispatchSkillsAndTechnologies: (action) =>
        set((state) => {
          state.cvData.skillsAndTechnologies = skillsAndTechnologiesReducer(
            state.cvData.skillsAndTechnologies,
            action
          );
        }),
      dispatchExperienceHighlights: (action) =>
        set((state) => {
          state.cvData.experienceHighlights = experienceAndHighlightsReducer(
            state.cvData.experienceHighlights,
            action
          );
        }),
      dispatchForeignLanguages: (action) =>
        set((state) => {
          state.cvData.foreignLanguages = arrayInputReducer({
            input: state.cvData.foreignLanguages,
            action,
            validators: [],
          });
        }),
      dispatchProjectLinks: (action) =>
        set((state) => {
          state.cvData.projectLinks = arrayInputReducer({
            input: state.cvData.projectLinks,
            action,
            validators: [],
          });
        }),
      dispatchEducations: (action) =>
        set((state) => {
          state.cvData.educations = arrayInputReducer({
            input: state.cvData.educations,
            action,
            validators: [],
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
    }))
  )
);

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
  (val) =>
    val.length > 0
      ? { type: "success" }
      : {
          type: "warning",
          message: "Це поле краще заповнити",
        },
  (val) =>
    val.length <= 200
      ? { type: "success" }
      : {
          type: "error",
          message: "Перевищено ліміт у 200 символів",
        },
]);

const skillsAndTechnologiesReducer = makeStringInputReducer([
  (val) =>
    val.length > 0
      ? { type: "success" }
      : {
          type: "warning",
          message: "Це поле краще заповнити",
        },
  (val) =>
    val.length <= 200
      ? { type: "success" }
      : {
          type: "error",
          message: "Перевищено ліміт у 200 символів",
        },
]);

const experienceAndHighlightsReducer = makeStringInputReducer([
  (val) =>
    val.length > 0
      ? { type: "success" }
      : {
          type: "warning",
          message: "Це поле краще заповнити",
        },
  (val) =>
    val.length <= 200
      ? { type: "success" }
      : {
          type: "error",
          message: "Перевищено ліміт у 200 символів",
        },
]);
