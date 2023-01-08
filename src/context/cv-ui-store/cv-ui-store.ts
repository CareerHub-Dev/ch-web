import create from 'zustand';
import { devtools } from 'zustand/middleware';
import { createStagesSlice, type StagesSlice } from './stages-slice';
import {
  createAssistanceSlice,
  type AssistanceSlice,
} from './assistance-slice';
import { createModalSlice, type ModalSlice } from './modal-slice';

export const useCvUiStore = create<
  StagesSlice & AssistanceSlice & ModalSlice
>()(
  devtools((...a) => ({
    ...createStagesSlice(...a),
    ...createAssistanceSlice(...a),
    ...createModalSlice(...a),
  }))
);
