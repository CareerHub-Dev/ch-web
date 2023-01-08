export type ItemListState<TItem> =
  | {
      dialog: null;
      editedItem: null;
      editedItemIndex: null;
    }
  | {
      dialog: 'add';
      editedItem: null;
      editedItemIndex: null;
    }
  | {
      dialog: 'edit';
      editedItem: TItem;
      editedItemIndex: number;
    }
  | {
      dialog: 'remove';
      editedItem: TItem;
      editedItemIndex: number;
    };

type ItemListActions<TItem> =
  | { type: 'add' }
  | { type: 'close' }
  | { type: 'edit'; item: TItem; itemIndex: number }
  | { type: 'remove'; item: TItem; itemIndex: number };

export function dialogActionsListReducer<TItem>(
  state: ItemListState<TItem>,
  action: ItemListActions<TItem>
): ItemListState<TItem> {
  switch (action.type) {
    case 'close':
      return { dialog: null, editedItem: null, editedItemIndex: null };
    case 'add':
      return { dialog: 'add', editedItem: null, editedItemIndex: null };
    case 'edit':
      return {
        dialog: 'edit',
        editedItem: action.item,
        editedItemIndex: action.itemIndex,
      };
    case 'remove':
      return {
        dialog: 'remove',
        editedItem: action.item,
        editedItemIndex: action.itemIndex,
      };
    default:
      return state;
  }
}
