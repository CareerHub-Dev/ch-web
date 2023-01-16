export type ItemListState<TItem> =
  | {
      dialog: null;
      focusedItem: null;
      focusedItemIndex: null;
    }
  | {
      dialog: 'add';
      focusedItem: null;
      focusedItemIndex: null;
    }
  | {
      dialog: 'edit';
      focusedItem: TItem;
      focusedItemIndex: number;
    }
  | {
      dialog: 'remove';
      focusedItem: TItem;
      focusedItemIndex: number;
    };

type ItemListAction<TItem> =
  | { type: 'add' }
  | { type: 'close' }
  | { type: 'edit'; item: TItem; itemIndex: number }
  | { type: 'remove'; item: TItem; itemIndex: number };

export function dialogActionsListReducer<TItem>(
  state: ItemListState<TItem>,
  action: ItemListAction<TItem>
): ItemListState<TItem> {
  switch (action.type) {
    case 'close':
      return { dialog: null, focusedItem: null, focusedItemIndex: null };
    case 'add':
      return { dialog: 'add', focusedItem: null, focusedItemIndex: null };
    case 'edit':
      return {
        dialog: 'edit',
        focusedItem: action.item,
        focusedItemIndex: action.itemIndex,
      };
    case 'remove':
      return {
        dialog: 'remove',
        focusedItem: action.item,
        focusedItemIndex: action.itemIndex,
      };
    default:
      return state;
  }
}
