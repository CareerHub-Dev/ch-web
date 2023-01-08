import { type StateCreator } from 'zustand';

type StageNumber = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7;

export type StagesSlice = {
  currentStage: StageNumber;
  goToStage: (num: StageNumber) => void;
};

export const createStagesSlice: StateCreator<StagesSlice> = (set) => ({
  currentStage: 0,
  goToStage: (num: StageNumber) => set({ currentStage: num }),
});
