import FormLabel from './FormLabel';
import FormErrorMessage from './FormErrorMessage';

import cn from 'classnames';
import classes from './Form.module.scss';

type HandlerFn = (event: React.ChangeEvent<HTMLSelectElement>) => any;

type SelectionState = {
  value: string;
  isValid: boolean;
  hasError: boolean;
  valueChangeHandler: HandlerFn;
  inputBlurHandler: HandlerFn;
  reset?: (...params: Array<any>) => any;
};

type SelectionOption = {
  value: string;
  text: string;
};

const FormSelect: React.FC<{
  id: string;
  selectionState: SelectionState;
  options: Array<SelectionOption>;
  label?: string;
  disabled?: boolean;
  errorMessage?: string;
  defaultOption?: SelectionOption;
}> = ({
  id,
  selectionState,
  options,
  label,
  disabled = false,
  errorMessage = 'Оберіть опцію',

  defaultOption = { value: '', text: 'Не обрано' },
}) => {
  return (
    <>
      {label && <FormLabel htmlFor={`${id}Selection`} disabled={disabled}>{label}</FormLabel>}
      <select
        id={`${id}Selection`}
        onChange={selectionState.valueChangeHandler}
        onBlur={selectionState.inputBlurHandler}
        value={selectionState.value}
        className={cn(
          classes.select,
          selectionState.hasError && classes['select-invalid'],
          disabled && classes['select-disabled']
        )}
      >
        <option value={defaultOption.value} style={{ display: 'none' }}>
          {defaultOption.text}
        </option>
        {options.map((item) => (
          <option key={item.value} value={item.value}>
            {item.text}
          </option>
        ))}
      </select>
      {selectionState.hasError && <FormErrorMessage message={errorMessage} />}
    </>
  );
};

export default FormSelect;
