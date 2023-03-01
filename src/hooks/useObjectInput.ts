import { useReducer } from 'react';

type InputState<TObject> = {
  initialValue: TObject;
  value: TObject;
  isTouched: boolean;
};

type InputAction<TObject> =
  | { type: 'INPUT'; value: TObject }
  | { type: 'FORCE'; value: TObject }
  | { type: 'BLUR' }
  | { type: 'RESET'; value?: TObject };

const inputStateReducer = <TObject>(
  state: InputState<TObject>,
  action: InputAction<TObject>
): InputState<TObject> => {  
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

export const useObjectInput = <TObject>({
  initialValue,
  validators = [],
}: {
  initialValue: TObject;
  validators?: Array<Inputs.Validator<TObject>>;
}) => {
  const [inputState, dispatch] = useReducer<typeof inputStateReducer<TObject>>(
    inputStateReducer,
    {
      initialValue,
      isTouched: false,
      value: initialValue,
    }
  );
  const warnings: string[] = [];
  const errors: string[] = [];

  for (const validator of validators) {
    const result = validator(inputState.value);
    if (result.type === 'success') continue;
    const arrayToAppend = result.type === 'warning' ? warnings : errors;
    arrayToAppend.push(result.message);
  }

  const change = (value: TObject) => {
    dispatch({ type: 'INPUT', value });
  };

  return {
    value: inputState.value,
    isTouched: inputState.isTouched,
    errors,
    warnings,
    change,
  };
};

export type UseObjectInputResult = ReturnType<typeof useObjectInput>;
