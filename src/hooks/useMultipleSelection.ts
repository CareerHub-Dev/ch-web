import { useState } from 'react';

const useMultipleSelection = <T>(initialState: Array<T> = []) => {
  const [selected, setSelected] = useState(initialState);

  const toggleSelected = (value: T) => {
    if (selected.includes(value)) {
      setSelected(selected.filter((item) => item !== value));
    } else {
      setSelected([...selected, value]);
    }
  };

  const isSelected = (value: T) => selected.includes(value);

  const reset = () => setSelected([]);

  return {
    selected,
    toggleSelected,
    isSelected,
    reset,
  };
};
export default useMultipleSelection;
