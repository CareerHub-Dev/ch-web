import { create } from 'zustand';
import {
  createAssistanceSlice,
  type AssistanceSlice
} from './assistance-slice';
import { createModalSlice, type ModalSlice } from './modal-slice';
import { createStagesSlice, type StagesSlice } from './stages-slice';

export const useCvUiStore = create<
  StagesSlice & AssistanceSlice & ModalSlice
>()((...a) => ({
  ...createStagesSlice(...a),
  ...createAssistanceSlice(...a),
  ...createModalSlice(...a),
}));
