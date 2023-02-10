import { useReducer } from 'react';

type InputState = Omit<Inputs.StringInput, 'warnings' | 'errors'> & {
  initialValue: string;
};

type InputAction =
  | { type: 'INPUT'; value: string }
  | { type: 'FORCE'; value: string }
  | { type: 'BLUR' }
  | { type: 'RESET'; value?: string };

function inputStateReducer(state: InputState, action: InputAction): InputState {
  if (action.type === 'INPUT') {
    return {
      ...state,
      value: action.value,
      wasChanged: true,
    };
  }
  if (action.type === 'BLUR') {
    return { ...state, wasBlurred: true };
  }
  if (action.type === 'RESET') {
    const initialValue = action.value ?? state.initialValue;
    return {
      value: initialValue,
      wasChanged: false,
      wasBlurred: false,
      initialValue,
    };
  }
  if (action.type === 'FORCE') {
    return {
      ...state,
      value: action.value,
    };
  }

  return { ...state };
}

export function useInput(opts?: {
  validators?: Array<Inputs.Validator<string>>;
  initialValue?: string;
}) {
  const initialValue = opts?.initialValue ?? '';
  const validators = opts?.validators ?? [];
  const [inputState, dispatch] = useReducer(inputStateReducer, {
    wasChanged: false,
    wasBlurred: false,
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

  const reset = (value?: string) => {
    dispatch({ type: 'RESET', value: value });
  };

  const force = (value: string) => {
    dispatch({ type: 'FORCE', value });
  };

  return {
    value: inputState.value,
    wasChanged: inputState.wasChanged,
    wasBlurred: inputState.wasBlurred,
    errors,
    warnings,
    change,
    blur,
    reset,
    force,
    hasErrors: errors.length > 0,
    hasWarnings: warnings.length > 0,
    isValid: errors.length === 0 && warnings.length === 0,
  };
}

export type UseInputResult = ReturnType<typeof useInput>;
