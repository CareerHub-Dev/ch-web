import { useReducer } from 'react';

type InputState = {
  initialValue: string;
  value: string;
  isTouched: boolean;
};

type InputAction =
  | { type: 'INPUT'; value: string }
  | { type: 'FORCE'; value: string }
  | { type: 'BLUR' }
  | { type: 'RESET'; value?: string };

const inputStateReducer = (
  state: InputState,
  action: InputAction
): InputState => {
  if (action.type === 'INPUT') {
    return {
      value: action.value,
      isTouched: true,
      initialValue: state.initialValue,
    };
  }
  if (action.type === 'BLUR') {
    return {
      value: state.value,
      isTouched: true,
      initialValue: state.initialValue,
    };
  }
  if (action.type === 'RESET') {
    const initialValue = action.value ?? state.initialValue;
    return { value: initialValue, isTouched: false, initialValue };
  }
  if (action.type === 'FORCE') {
    return {
      value: action.value,
      isTouched: false,
      initialValue: state.initialValue,
    };
  }

  return {
    value: state.value,
    isTouched: state.isTouched,
    initialValue: state.initialValue,
  };
};

export const useInput = (opts?: {
  validators?: Array<Inputs.Validator<string>>;
  initialValue?: string;
}) => {
  const initialValue = opts?.initialValue ?? '';
  const validators = opts?.validators ?? [];
  const [inputState, dispatch] = useReducer(inputStateReducer, {
    isTouched: false,
    initialValue,
    value: initialValue,
  });
  const warnings: string[] = [];
  const errors: string[] = [];

  for (const validator of validators) {
    const result = validator(inputState.value);
    if (result.type === 'success') continue;
    const arrayToAppend = result.type === 'warning' ? warnings : errors;
    arrayToAppend.push(result.message);
  }

  const change = (value: string) => {
    dispatch({ type: 'INPUT', value });
  };

  const blur = () => {
    dispatch({ type: 'BLUR' });
  };

  return {
    value: inputState.value,
    isTouched: inputState.isTouched,
    errors,
    warnings,
    change,
    blur,
    hasErrors: errors.length > 0,
    hasWarnings: warnings.length > 0,
  };
};

export type UseInputResult = ReturnType<typeof useInput>;
