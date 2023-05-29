import { useState } from "react";

const useStringSet = (initialValues: Array<string> = []) => {
  const [items, setItems] = useState(initialValues);
  const normilzedItems = items.map((item) => item.toLowerCase());

  const add = (val: string) => {
    val = val.trim();
    const itemIsInvalid =
      normilzedItems.includes(val.toLowerCase()) || val.length === 0;
    if (itemIsInvalid) {
      return;
    }
    setItems([...items, val]);
  };

  const remove = (val: string) => {
    setItems(items.filter((item) => item !== val));
  };

  const reset = () => {
    setItems([]);
  };

  return {
    items,
    add,
    remove,
    reset,
  };
};
export default useStringSet;
