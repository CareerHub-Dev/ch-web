import { create } from "zustand";
import { devtools } from "zustand/middleware";

export type ExperienceState = {
    title: string;
    companyName: string;
};

export type ExperienceActions = {
    setTitle: (val: string) => void;
    setCompanyName: (val: string) => void;
};

export type ExperienceStore = ExperienceState & ExperienceActions;

export const useAddExperienceStore = create<ExperienceStore>()(
    devtools((set) => ({
        title: "",
        companyName: "",
        setTitle: (val: string) => set((state) => ({ ...state, title: val })),
        setCompanyName: (val: string) =>
            set((state) => ({ ...state, companyName: val })),
    }))
);
