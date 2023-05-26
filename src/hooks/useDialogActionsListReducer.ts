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
    const [state, dispatch] = useReducer(
        dialogActionsListReducer<TListItem>,
        options?.initialValue || {
            dialog: null,
            focusedItem: null,
            focusedItemIndex: null,
        }
    );
    const edit = (item: TListItem, itemIndex: number) => {
        dispatch({ type: "edit", item, itemIndex });
    };
    const add = () => {
        dispatch({ type: "add" });
    };
    const remove = (item: TListItem, itemIndex: number) => {
        dispatch({ type: "remove", item, itemIndex });
    };
    const close = () => {
        dispatch({ type: "close" });
    };
    return {
        state,
        dispatch,
        edit,
        add,
        remove,
        close,
    };
}

export function useDialogActionsPaginatedListReducer<TListItem>(options?: {
    initialValue?: PaginatedItemListState<TListItem>;
}) {
    const [state, dispatch] = useReducer(
        dialogActionsPaginatedListReducer<TListItem>,
        options?.initialValue || {
            dialog: null,
            focusedItem: null,
            focusedItemIndex: null,
            focusedItemPageIndex: null,
        }
    );

    const edit = (item: TListItem, itemIndex: number, pageIndex: number) => {
        dispatch({ type: "edit", item, itemIndex, pageIndex });
    };
    const add = () => {
        dispatch({ type: "add" });
    };
    const remove = (item: TListItem, itemIndex: number, pageIndex: number) => {
        dispatch({ type: "remove", item, itemIndex, pageIndex });
    };
    const close = () => {
        dispatch({ type: "close" });
    };
    return {
        state,
        dispatch,
        edit,
        add,
        remove,
        close,
    };
}
