import FormLabel from './FormLabel';
import FormErrorMessage from './FormErrorMessage';

import cn from 'classnames';
import classes from './Form.module.scss';

type Input = {
  value: string;
  isValid: boolean;
  hasError: boolean;
  valueChangeHandler: (...params: Array<any>) => any;
  inputBlurHandler: (...params: Array<any>) => any;
  reset?: (...params: Array<any>) => any;
};

const FormTextArea: React.FC<{
  id: string;
  input: Input;
  label?: string;
  errorMessage?: string;
  placeholder?: string;
}> = ({
  id,
  input,
  label,
  errorMessage = 'Заповніть це поле',
  placeholder = '',
}) => {
  return (
    <>
      {label && <FormLabel htmlFor={`${id}TextArea`}>{label}</FormLabel>}
      <textarea
        id={`${id}TextArea`}
        value={input.value}
        placeholder={placeholder}
        className={cn(
          classes.textarea,
          input.hasError && classes['textarea-invalid']
        )}
        onChange={input.valueChangeHandler}
        onBlur={input.inputBlurHandler}
      />
      {errorMessage && input.hasError && (
        <FormErrorMessage message={errorMessage} />
      )}
    </>
  );
};

export default FormTextArea;
