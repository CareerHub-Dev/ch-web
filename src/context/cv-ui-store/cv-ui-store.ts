import { create } from 'zustand';
import { createModalSlice, type ModalSlice } from './modal-slice';
import { createStagesSlice, type StagesSlice } from './stages-slice';

export const useCvUiStore = create<StagesSlice & ModalSlice>()((...a) => ({
  ...createStagesSlice(...a),
  ...createModalSlice(...a),
}));
