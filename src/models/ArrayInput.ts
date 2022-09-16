type ArrayInput<T> = {
  value: Array<T>;
  isValid: boolean;
  isTouched: boolean;
};

export default ArrayInput;

export const getArrayInput = <T>(
  isValid: boolean = false,
  isTouched: boolean = false
) => {
  return {
    value: new Array<T>(),
    isValid: isValid,
    isTouched: isTouched,
  } as ArrayInput<T>;
};

export const disableArrayInput = <T>(input: ArrayInput<T>) => {
  input.value = [];
  input.isTouched = true;
  input.isValid = true;
};

export const removeArrayInputItem = <T extends Object>(
  input: ArrayInput<IndexedObject<T>>,
  id: string
) => {
  const items = input.value;
  input.value = items.filter((x) => x.id !== id);
  if (input.value.length === 0) {
    input.isValid = false;
  }
};

export const addArrayInputItem = <T extends Object>(
  input: ArrayInput<IndexedObject<T>>,
  item: T
) => {
  input.value.push({ ...item, id: input.value.length.toString() });
  input.isTouched = true;
  input.isValid = true;
};
