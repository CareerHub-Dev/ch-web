import { type StateCreator } from "zustand";

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

export type StageNumber = typeof CV_EDITOR_STAGES[number]["id"];

export type StagesSlice = {
  currentStage: StageNumber;
  goToStage: (num: StageNumber) => void;
};

export const createStagesSlice: StateCreator<StagesSlice> = (set) => ({
  currentStage: 0,
  goToStage: (num: StageNumber) => set({ currentStage: num }),
});
