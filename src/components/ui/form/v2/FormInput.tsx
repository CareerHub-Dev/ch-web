import type { UseInputResult } from '@/hooks/useInput/v3';
import cn from 'classnames';

const FormInput = ({
  value,
  change,
  blur,
  hasError,
  error,
  className,
  disabled = false,
  type = 'text',
  id,
}: UseInputResult & {
  className?: string;
  disabled?: boolean;
  type?: string;
  id?: string;
}) => {
  return (
    <>
      <input
        id={id}
        type={type}
        className={cn('form-input', className)}
        onChange={change}
        onBlur={blur}
        value={value}
        disabled={disabled}
      />
      {hasError && <span className="text-primaryRed">{error}</span>}
    </>
  );
};
export default FormInput;
