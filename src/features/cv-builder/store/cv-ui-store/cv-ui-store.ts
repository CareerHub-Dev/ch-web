import { create } from "zustand";
import { createModalSlice, type ModalSlice } from "./modal-slice";

export const useCvUiStore = create<ModalSlice>()((...a) => ({
  ...createModalSlice(...a),
}));
