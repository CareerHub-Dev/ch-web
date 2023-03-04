import { createStore } from "zustand";
import { immer } from "zustand/middleware/immer";
import { devtools } from "zustand/middleware/devtools";

type StudentProfileModal =
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

export const useStudentProfileStore = createStore<
  StudentProfileUiState & StudentProfileUiActions
>()(
  devtools(
    immer((set) => ({
      currentModal: null,
      closeModal: () => set({ currentModal: null }),
      openModal: (modal: StudentProfileModal) => set({ currentModal: modal }),
    }))
  )
);
