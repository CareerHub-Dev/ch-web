import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

type FocusedStudentCv = { id: string; title: string };

export type StudentCvsState = {
  search: string;
  focusedCv: FocusedStudentCv;
  removeCvModalIsOpen: boolean;
};

type StudentCvsActions = {
  setSearch: (value: string) => void;
  setFocusedCv: (cv: FocusedStudentCv) => void;
  openRemoveCvModal: (cv?: FocusedStudentCv) => void;
  closeRemoveCvModal: () => void;
};

export type StudentCvsStore = StudentCvsState & StudentCvsActions;

export const initialStudentCvsState = {
  search: "",
  focusedCv: { id: "", title: "" },
  removeCvModalIsOpen: false,
} satisfies StudentCvsState;

export const useStudentCvsStore = create<StudentCvsStore>()(
  devtools(
    immer((set) => ({
      ...initialStudentCvsState,
      setSearch: (value: string) =>
        set((state) => {
          state.search = value;
        }),
      setFocusedCv: (cv: FocusedStudentCv) =>
        set((state) => {
          state.focusedCv = cv;
        }),
      openRemoveCvModal: (cv?: FocusedStudentCv) =>
        set((state) => {
          state.removeCvModalIsOpen = true;
          if (cv) {
            state.focusedCv = cv;
          }
        }),
      closeRemoveCvModal: () =>
        set((state) => {
          state.removeCvModalIsOpen = false;
        }),
    }))
  )
);
