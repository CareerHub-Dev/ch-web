import { create } from "zustand";
import { devtools } from "zustand/middleware";

export type StudentProfileModal =
    | "followedStudents"
    | "studentFollowers"
    | "followedCompanies"
    | "trackedJobOffers";

export type StudentProfileUiState = {
    currentModal: null | StudentProfileModal;
};

export type StudentProfileUiActions = {
    closeModal: () => void;
    openModal: (modal: StudentProfileModal) => void;
};

export const useStudentProfileStore = create<
    StudentProfileUiState & StudentProfileUiActions
>()(
    devtools((set) => ({
        currentModal: null,
        closeModal: () => set((_state) => ({ currentModal: null })),
        openModal: (modal: StudentProfileModal) =>
            set((_state) => ({ currentModal: modal })),
    }))
);
