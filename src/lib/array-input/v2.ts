import { validateInput } from "../base-input";

type ArrayInput<TItem> = Inputs.ArrayInput<TItem>;

export type ArrayInputAction<TItem> =
  | { type: "add"; item: TItem }
  | { type: "edit"; itemIndex: number; newValue: TItem }
  | { type: "blur" }
  | { type: "remove"; itemIndex: number };

export function getArrayInput<TItem>(): ArrayInput<TItem>;
export function getArrayInput<TItem>(options: {
  initialItems: Array<TItem>;
}): ArrayInput<TItem>;
export function getArrayInput<TItem>(options?: {
  initialItems: Array<TItem>;
  wasChanged: boolean;
}): ArrayInput<TItem>;

export function getArrayInput<TItem>(options?: {
  initialItems: Array<TItem>;
  wasChanged?: boolean;
}): ArrayInput<TItem> {
  return {
    items: options?.initialItems ?? [],
    wasChanged: options?.wasChanged ?? false,
    errors: [],
    warnings: [],
  };
}

export function arrayInputReducer<TItem>({
  input,
  action,
  validators,
}: {
  input: ArrayInput<TItem>;
  action: ArrayInputAction<TItem>;
  validators: Array<Inputs.Validator<Array<TItem>>>;
}): ArrayInput<TItem> {
  let { items } = { ...input };

  switch (action.type) {
    case "add":
      items.push(action.item);
      break;
    case "remove":
      items.splice(action.itemIndex, 1);
      break;
    case "edit":
      if (items[action.itemIndex]) items[action.itemIndex] = action.newValue;
      break;
    case "blur":
      // do nothing, just validate
      break;
    default:
      break;
  }

  const newInput: ArrayInput<TItem> = {
    items,
    errors: [],
    warnings: [],
    wasChanged: true,
  };

  return validateInput({
    input: newInput,
    validators,
    getValidatedValue: (inp) => inp.items,
  });
}
