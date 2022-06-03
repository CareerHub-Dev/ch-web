import cn from 'classnames';
import classes from './Form.module.scss';

const FormLabel: React.FC<{
  htmlFor?: string;
  hasError?: boolean;
  disabled?: boolean;
}> = ({ htmlFor, hasError = false, disabled = false, children }) => {
  return (
    <label
      className={cn(
        classes.label,
        hasError && classes['label-invalid'],
        disabled && classes['label-disabled']
      )}
      htmlFor={`${htmlFor}Input`}
    >
      {children}
    </label>
  );
};

export default FormLabel;
