import { useState } from "react";

export function useArrayInput<TItem extends object>({
  initialValues,
  getId,
}: {
  initialValues?: Array<TItem>;
  getId: (item: TItem) => string | number;
}) {
  const [items, setItems] = useState(initialValues ?? []);
  const [wasChanged, setWasChanged] = useState(false);

  const add = (item: TItem) => {
    if (items.find((i) => getId(i) === getId(item))) {
      return;
    }
    setWasChanged(true);
    setItems([...items, item]);
  };

  const edit = (item: TItem, itemIndex: number) => {
    setItems((prev) => {
      const newItems = [...prev];
      newItems[itemIndex] = item;
      return newItems;
    });
    setWasChanged(true);
  };

  const remove = (item: TItem) => {
    setItems(items.filter((i) => getId(i) !== getId(item)));
    setWasChanged(true);
  };

  const reset = (val?: TItem[]) => {
    setItems(val ?? initialValues ?? []);
    setWasChanged(false);
  };

  return {
    items,
    wasChanged,
    add,
    edit,
    remove,
    reset,
  };
}
