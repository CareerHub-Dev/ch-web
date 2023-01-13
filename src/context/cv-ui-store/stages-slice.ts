import { type StateCreator } from 'zustand';

export const CV_EDITOR_STAGES = [0, 1, 2, 3, 4, 5, 6, 7] as const;

export type StageNumber = typeof CV_EDITOR_STAGES[number];

export type StagesSlice = {
  currentStage: StageNumber;
  goToStage: (num: StageNumber) => void;
};

export const createStagesSlice: StateCreator<StagesSlice> = (set) => ({
  currentStage: 0,
  goToStage: (num: StageNumber) => set({ currentStage: num }),
});
