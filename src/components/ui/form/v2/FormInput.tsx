import type { UseInputResult } from '@/hooks/useInput/v3';
import cn from 'classnames';
import { type InputHTMLAttributes, type DetailedHTMLProps } from 'react';

type MiscellaneousInputProps = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

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
  ...otherProps
}: UseInputResult & MiscellaneousInputProps) => {
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
        {...otherProps}
      />
      {hasError && <span className="text-primaryRed">{error}</span>}
    </>
  );
};
export default FormInput;
