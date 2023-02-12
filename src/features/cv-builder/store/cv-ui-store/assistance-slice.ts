import { type StateCreator } from "zustand";

export type AssistanceSlice = {
  isAssistanceEnabled: boolean;
  toggleAssistance: () => void;
};

export const createAssistanceSlice: StateCreator<AssistanceSlice> = (set) => ({
  isAssistanceEnabled: false,
  toggleAssistance: () =>
    set((prev) => ({ isAssistanceEnabled: !prev.isAssistanceEnabled })),
});
