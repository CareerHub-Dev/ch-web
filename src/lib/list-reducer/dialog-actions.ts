export type ItemListState<TItem> =
    | {
          dialog: null;
          focusedItem: null | TItem;
          focusedItemIndex: null | number;
      }
    | {
          dialog: "add";
          focusedItem: null;
          focusedItemIndex: null;
      }
    | {
          dialog: "edit";
          focusedItem: TItem;
          focusedItemIndex: number;
      }
    | {
          dialog: "remove";
          focusedItem: TItem;
          focusedItemIndex: number;
      };

export type ItemListAction<TItem> =
    | { type: "add" }
    | { type: "close" }
    | { type: "edit"; item: TItem; itemIndex: number }
    | { type: "remove"; item: TItem; itemIndex: number };

export function dialogActionsListReducer<TItem>(
    state: ItemListState<TItem>,
    action: ItemListAction<TItem>
): ItemListState<TItem> {
    switch (action.type) {
        case "close":
            return { ...state, dialog: null };
        case "add":
            return { dialog: "add", focusedItem: null, focusedItemIndex: null };
        case "edit":
            return {
                dialog: "edit",
                focusedItem: action.item,
                focusedItemIndex: action.itemIndex,
            };
        case "remove":
            return {
                dialog: "remove",
                focusedItem: action.item,
                focusedItemIndex: action.itemIndex,
            };
        default:
            return state;
    }
}

export type PaginatedItemListState<TItem> =
    | {
          dialog: null;
          focusedItem: null | TItem;
          focusedItemIndex: null | number;
          focusedItemPageIndex: null | number;
      }
    | {
          dialog: "add";
          focusedItem: null;
          focusedItemIndex: null;
          focusedItemPageIndex: null;
      }
    | {
          dialog: "edit";
          focusedItem: TItem;
          focusedItemIndex: number;
          focusedItemPageIndex: number;
      }
    | {
          dialog: "remove";
          focusedItem: TItem;
          focusedItemIndex: number;
          focusedItemPageIndex: number;
      };

export type PaginatedItemListAction<TItem> =
    | { type: "add" }
    | { type: "close" }
    | { type: "edit"; item: TItem; itemIndex: number; pageIndex: number }
    | { type: "remove"; item: TItem; itemIndex: number; pageIndex: number };

export function dialogActionsPaginatedListReducer<TItem>(
    state: PaginatedItemListState<TItem>,
    action: PaginatedItemListAction<TItem>
): PaginatedItemListState<TItem> {
    switch (action.type) {
        case "close":
            return {
                ...state,
                dialog: null,
            };
        case "add":
            return {
                dialog: "add",
                focusedItem: null,
                focusedItemIndex: null,
                focusedItemPageIndex: null,
            };
        case "edit":
            return {
                dialog: "edit",
                focusedItem: action.item,
                focusedItemIndex: action.itemIndex,
                focusedItemPageIndex: action.pageIndex,
            };
        case "remove":
            return {
                dialog: "remove",
                focusedItem: action.item,
                focusedItemIndex: action.itemIndex,
                focusedItemPageIndex: action.pageIndex,
            };
        default:
            return { ...state };
    }
}
