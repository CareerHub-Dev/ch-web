import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

export type StudentPostsFeedState = {
  search: string;
};

type StudentPostsFeedActions = {
  setSearch: (search: string) => void;
};

export type StudentPostsFeedStore = StudentPostsFeedState &
  StudentPostsFeedActions;

export const initialStudentPostsFeedState: StudentPostsFeedState = {
  search: "",
};

export const useJobOffersFeedStore = create<StudentPostsFeedStore>()(
  devtools(
    immer((set) => ({
      ...initialStudentPostsFeedState,
      setSearch: (search: string) =>
        set((state) => {
          state.search = search;
        }),
    }))
  )
);
