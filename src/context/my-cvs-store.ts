import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

type State = {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
};

export const useMyCvsStore = create<State>()(
  immer((set) => ({
    searchTerm: '',
    setSearchTerm: (val) =>
      set((state) => {
        state.searchTerm = val;
      }),
  }))
);
