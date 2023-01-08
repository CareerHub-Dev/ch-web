import {
  dialogActionsListReducer,
  type ItemListState,
} from '@/lib/list-reducer/dialog-actions';
import { useReducer } from 'react';

export function useDialogActionsListReducer<TListItem>(options?: {
  initialValue?: ItemListState<TListItem>;
}) {
  return useReducer(
    dialogActionsListReducer<TListItem>,
    options?.initialValue || {
      dialog: null,
      editedItem: null,
      editedItemIndex: null,
    }
  );
}
