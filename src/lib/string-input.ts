export const getStringInput = (
  value: string = '',
  isValid: boolean = false,
  isTouched: boolean = false
) => {
  return {
    value: value,
    isValid: isValid,
    isTouched: isTouched,
  } as StringInput;
};

export const setStringInputValue = (
  input: StringInput,
  value: string,
  validationFn: ValidationFn = (value) => value.trim().length !== 0
) => {
  input.value = value;
  input.isTouched = true;
  input.isValid = validationFn(value);
};

export type ValidationFn = (...params: Array<any>) => boolean;