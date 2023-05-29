import { create } from "zustand";
import { devtools } from "zustand/middleware";

export type StudentProfileModal =
  | "addExperience"
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

export type StudentProfileStore = StudentProfileUiState &
  StudentProfileUiActions;

export const useStudentProfileStore = create<StudentProfileStore>()(
  devtools((set) => ({
    currentModal: null,
    closeModal: () => set(() => ({ currentModal: null })),
    openModal: (modal: StudentProfileModal) =>
      set(() => ({ currentModal: modal })),
  }))
);
