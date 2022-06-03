import useAppDispatch from './useAppDispatch';
import { useSelector } from 'react-redux';
import { TransformedStringInput } from '../store/cv-constructor';
import { RootState } from '../store';
import { ActionCreatorWithPayload } from '@reduxjs/toolkit';

type ChangeEvent =
  | React.ChangeEvent<HTMLSelectElement>
  | React.ChangeEvent<HTMLInputElement>;

const useReduxStringInput = (
  selector: (state: RootState) => TransformedStringInput,
  setAction: ActionCreatorWithPayload<string, string>
) => {
  const inputState = useSelector(selector);
  const dispatch = useAppDispatch();

  return {
    value: inputState.value,
    isValid: inputState.isValid,
    hasError: inputState.hasError,
    valueChangeHandler: (event: ChangeEvent) =>
      dispatch(setAction(event.target.value)),
    inputBlurHandler: () => dispatch(setAction(inputState.value)),
    reset: () => dispatch(setAction('')),
  };
};

export default useReduxStringInput;
