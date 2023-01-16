import { validateInput } from '../base-input';

type ArrayInput<TItem> = Inputs.ArrayInput<TItem>;

export type ArrayInputAction<TItem> =
  | { type: 'add'; item: TItem }
  | { type: 'edit'; itemIndex: number; newValue: TItem }
  | { type: 'remove'; itemIndex: number };

export function getArrayInput<TItem>(): ArrayInput<TItem>;
export function getArrayInput<TItem>(options: {
  initialItems: Array<TItem>;
}): ArrayInput<TItem>;

export function getArrayInput<TItem>(options?: {
  initialItems: Array<TItem>;
}): ArrayInput<TItem> {
  return {
    items: options?.initialItems ?? [],
    isTouched: false,
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
  const newInput = { ...input };

  switch (action.type) {
    case 'add':
      newInput.items.push(action.item);
      break;
    case 'remove':
      newInput.items.splice(action.itemIndex, 1);
      break;
    case 'edit':
      if (newInput.items.at(action.itemIndex))
        newInput.items[action.itemIndex] = action.newValue;
      break;
  }
  validateInput({
    input: newInput,
    validators,
    getValidatedValue: (inp) => inp.items,
  });
  newInput.isTouched = true;
  return newInput;
}
