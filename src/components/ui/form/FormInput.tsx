import FormLabel from './FormLabel';
import FormErrorMessage from './FormErrorMessage';
import cn from 'classnames';
import classes from './Form.module.scss';

type Input = {
  value: string;
  isValid: boolean;
  hasError: boolean;
  valueChangeHandler: AnyFn;
  inputBlurHandler: AnyFn;
  reset?: AnyFn;
};

const FormInput: React.FC<{
  id: string;
  input: Input;
  disabled?: boolean;
  label?: string;
  errorMessage?: string;
  placeholder?: string;
}> = ({
  id,
  input,
  disabled = false,
  label,
  errorMessage = 'Заповніть це поле',
  placeholder = '',
}) => {
  return (
    <>
      {label && (
        <FormLabel htmlFor={`${id}Input`} disabled={disabled}>
          {label}
        </FormLabel>
      )}
      <input
        id={`${id}Input`}
        value={input.value}
        type="text"
        placeholder={placeholder}
        className={cn(
          classes.input,
          input.hasError && classes['input-invalid'],
          disabled && classes['input-disabled']
        )}
        disabled={disabled}
        onChange={input.valueChangeHandler}
        onBlur={input.inputBlurHandler}
      />
      {errorMessage && input.hasError && (
        <FormErrorMessage message={errorMessage} />
      )}
    </>
  );
};

export default FormInput;
