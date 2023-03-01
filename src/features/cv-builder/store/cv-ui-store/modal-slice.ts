import { type StateCreator } from "zustand";

type Modal = "save" | "discard" | "reInit" | "preview";

export type ModalSlice = {
  currentModal: null | Modal;
  closeModal: () => void;
  openModal: (modal: Modal) => void;
  openSaveModal: () => void;
  openDiscardModal: () => void;
  openReInitModal: () => void;
  openPreviewModal: () => void;
};

export const createModalSlice: StateCreator<ModalSlice> = (set) => ({
  currentModal: null,
  closeModal: () => set({ currentModal: null }),
  openModal: (modal: Modal) => set({ currentModal: modal }),
  openSaveModal: () => set({ currentModal: "save" }),
  openDiscardModal: () => set({ currentModal: "discard" }),
  openReInitModal: () => set({ currentModal: "reInit" }),
  openPreviewModal: () => set({ currentModal: "preview" }),
});
