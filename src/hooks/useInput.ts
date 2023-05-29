import { useReducer } from "react";
import {
  makeStringInputReducer,
  createStringInputReducerActions,
  validateStringValue,
} from "@/lib/string-input";

export function useInput(opts?: {
  validators?: Array<Inputs.Validator<string>>;
  initialValue?: string;
}) {
  const initialValue = opts?.initialValue ?? "";
  const validators = opts?.validators ?? [];

  const [inputState, dispatch] = useReducer(
    makeStringInputReducer(validators),
    {
      wasChanged: false,
      wasBlurred: false,
      value: initialValue,
      ...validateStringValue({ value: initialValue, validators }),
    }
  );

  return {
    ...inputState,
    ...createStringInputReducerActions(dispatch),
    hasErrors: inputState.errors.length > 0,
    hasWarnings: inputState.warnings.length > 0,
    isValid: inputState.errors.length === 0 && inputState.warnings.length === 0,
  };
}

export type UseInputResult = ReturnType<typeof useInput>;
