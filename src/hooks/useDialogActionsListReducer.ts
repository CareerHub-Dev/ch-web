import {
    dialogActionsListReducer,
    dialogActionsPaginatedListReducer,
    ItemListState,
    PaginatedItemListState,
} from "@/lib/list-reducer/dialog-actions";
import { useReducer } from "react";

export function useDialogActionsListReducer<TListItem>(options?: {
    initialValue?: ItemListState<TListItem>;
}) {
    return useReducer(
        dialogActionsListReducer<TListItem>,
        options?.initialValue || {
            dialog: null,
            focusedItem: null,
            focusedItemIndex: null,
        }
    );
}

export function useDialogActionsPaginatedListReducer<TListItem>(options?: {
    initialValue?: PaginatedItemListState<TListItem>;
}) {
    return useReducer(
        dialogActionsPaginatedListReducer<TListItem>,
        options?.initialValue || {
            dialog: null,
            focusedItem: null,
            focusedItemIndex: null,
            focusedItemPageIndex: null,
        }
    );
}
