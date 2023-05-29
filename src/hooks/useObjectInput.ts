import { useReducer } from "react";

type InputState<TObject> = {
  initialValue: TObject;
  value: TObject;
  wasChanged: boolean;
  wasBlurred: boolean;
};

type InputAction<TObject> =
  | { type: "INPUT"; value: TObject }
  | { type: "FORCE"; value: TObject }
  | { type: "BLUR" }
  | { type: "RESET"; value?: TObject };

const inputStateReducer = <TObject>(
  state: InputState<TObject>,
  action: InputAction<TObject>
): InputState<TObject> => {
  if (action.type === "INPUT") {
    return {
      ...state,
      value: action.value,
      wasChanged: true,
    };
  }
  if (action.type === "BLUR") {
    return {
      ...state,
      wasBlurred: true,
    };
  }
  if (action.type === "RESET") {
    const initialValue = action.value ?? state.initialValue;
    return {
      value: initialValue,
      wasBlurred: false,
      wasChanged: false,
      initialValue,
    };
  }
  if (action.type === "FORCE") {
    return {
      ...state,
      value: action.value,
    };
  }

  return {
    ...state,
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
      wasChanged: false,
      wasBlurred: false,
      value: initialValue,
    }
  );
  const warnings: string[] = [];
  const errors: string[] = [];

  for (const validator of validators) {
    const result = validator(inputState.value);
    if (result.type === "success") continue;
    const arrayToAppend = result.type === "warning" ? warnings : errors;
    arrayToAppend.push(result.message);
  }

  const change = (value: TObject) => {
    dispatch({ type: "INPUT", value });
  };

  const blur = () => {
    dispatch({ type: "BLUR" });
  };

  const reset = () => {
    dispatch({ type: "RESET" });
  };

  const force = (value: TObject) => {
    dispatch({ type: "FORCE", value });
  };

  const isValid = errors.length === 0 && warnings.length === 0;

  return {
    value: inputState.value,
    isValid,
    errors,
    warnings,
    change,
    blur,
    reset,
    force,
    wasChanged: inputState.wasChanged,
    wasBlurred: inputState.wasBlurred,
    hasErrors: errors.length > 0,
    hasWarnings: warnings.length > 0,
  };
};

export type UseObjectInputResult = ReturnType<typeof useObjectInput>;
