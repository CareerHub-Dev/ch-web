import React, { useReducer } from 'react';

type InputState = {
  value: string;
  isTouched: boolean;
};

type InputAction =
  | { type: 'INPUT'; value: string }
  | { type: 'FORCE'; value: string }
  | { type: 'BLUR' }
  | { type: 'RESET' };

type InputValidationFunction = (value: string) => boolean;

type InputChangeEvent = React.ChangeEvent<HTMLInputElement | HTMLSelectElement>;

const initialInputState = {
  value: '',
  isTouched: false,
};

const valueIsNotEmpty = (value: string) => value.length !== 0;

const inputStateReducer = (state: InputState, action: InputAction) => {
  if (action.type === 'INPUT') {
    return { value: action.value, isTouched: state.isTouched };
  }
  if (action.type === 'BLUR') {
    return { value: state.value, isTouched: true };
  }
  if (action.type === 'RESET') {
    return { value: '', isTouched: false };
  }
  if (action.type === 'FORCE') {
    return { value: action.value, isTouched: false };
  }

  return initialInputState;
};

const useInput = (
  validateFunction: InputValidationFunction = valueIsNotEmpty,
  initialValue: string = ''
) => {
  const [inputState, dispatch] = useReducer(inputStateReducer, {
    ...initialInputState,
    value: initialValue,
  });

  const valueIsValid = validateFunction(inputState.value);
  const hasError = !valueIsValid && inputState.isTouched;

  const valueChangeHandler = (event: InputChangeEvent) => {
    dispatch({ type: 'INPUT', value: event.target.value });
  };

  const inputBlurHandler = () => {
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
    isValid: valueIsValid,
    hasError,
    valueChangeHandler,
    inputBlurHandler,
    reset,
    force,
  };
};

export default useInput;

export type UseInputResult = ReturnType<typeof useInput>;
