import create from 'zustand';
import { devtools, persist } from 'zustand/middleware';

type CVEditState = {
  cvId: string | null;
  refresh: (newId: string) => void;
  initialData: null;
  pendingChanges: null;
};

export const useCVEditState = create<CVEditState>()(
  devtools(
    persist(
      (set) => ({
        cvId: null,
        refresh: (newId) => set({ cvId: newId }),
        initialData: null,
        pendingChanges: null,
      }),
      {
        name: 'cv-edit-storage',
      }
    )
  )
);
