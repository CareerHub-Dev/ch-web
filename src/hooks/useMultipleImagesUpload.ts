import { useState } from "react";

export function useMultipleImagesUpload() {
  const [data, setData] = useState<{ file: File; url: string }[]>([]);

  const reset = () => {
    setData([]);
  };

  const add = (file: File) => {
    const item = { file, url: URL.createObjectURL(file) };
    setData((prev) => [...prev, item]);
  };

  const remove = (itemIdx: number) => {
    const item = data[itemIdx];
    setData((prev) => prev.filter((_, idx) => idx !== itemIdx));
    if (item) {
      URL.revokeObjectURL(item.url);
    }
  };

  return {
    data,
    add,
    reset,
    remove,
  };
}

export function useSingleImageUpload() {
  const [data, setData] = useState<{ file: File; url: string }>();

  const reset = () => {
    setData(undefined);
  };

  const change = (file: File) => {
    const item = { file, url: URL.createObjectURL(file) };
    setData(item);
  };

  return {
    data,
    change,
    reset,
  };
}
