import { useReducer, type ChangeEvent } from 'react';

type InputState = {
  initialValue: string;
  value: string;
  isTouched: boolean;
};

type InputAction =
  | { type: 'INPUT'; value: string }
  | { type: 'FORCE'; value: string }
  | { type: 'BLUR' }
  | { type: 'RESET' };

type InputValidationFunction = (value: string) => boolean;

type InputChangeEvent = ChangeEvent<HTMLInputElement | HTMLSelectElement>;

const inputStateReducer = (state: InputState, action: InputAction) => {
  if (action.type === 'INPUT') {
    return { value: action.value, isTouched: state.isTouched, initialValue: state.initialValue };
  }
  if (action.type === 'BLUR') {
    return { value: state.value, isTouched: true, initialValue: state.initialValue };
  }
  if (action.type === 'RESET') {
    return { value: state.initialValue, isTouched: false, initialValue: state.initialValue };
  }
  if (action.type === 'FORCE') {
    return { value: action.value, isTouched: false, initialValue: state.initialValue };
  }

  return {
    value: state.value,
    isTouched: state.isTouched,
    initialValue: state.initialValue,
  };
};

const useInput = (opts?: {
  validators?: Array<{ validate: InputValidationFunction; message: string }>;
  initialValue?: string;
}) => {
  const initialValue = opts?.initialValue ?? '';
  const validators = opts?.validators ?? [];
  const [inputState, dispatch] = useReducer(inputStateReducer, {
    isTouched: false,
    initialValue,
    value: initialValue,
  });

  let valueIsValid = true;
  let errorMessage = '';
  for (const validator of validators) {
    if (!validator.validate(inputState.value)) {
      valueIsValid = false;
      errorMessage = validator.message;
      break;
    }
  }

  const hasError = !valueIsValid && inputState.isTouched;
  const isInitial = inputState.value === initialValue;

  const change = (event: InputChangeEvent) => {
    dispatch({ type: 'INPUT', value: event.target.value });
  };

  const blur = () => {
    dispatch({ type: 'BLUR' });
  };

  const reset = () => {
    dispatch({ type: 'RESET' });
  };

  const force = (value: string) => {
    dispatch({ type: 'FORCE', value });
  };

  return {
    value: inputState.value,
    isTouched: inputState.isTouched,
    isValid: valueIsValid,
    isInitial,
    error: errorMessage,
    hasError,
    change,
    blur,
    reset,
    force,
  };
};

export default useInput;

export type UseInputResult = ReturnType<typeof useInput>;
