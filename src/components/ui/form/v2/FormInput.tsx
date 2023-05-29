import type { UseInputResult } from "@/hooks/useInput";
import cn from "classnames";
import {
  type InputHTMLAttributes,
  type DetailedHTMLProps,
  ChangeEvent,
} from "react";

type MiscellaneousInputProps = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

function FormInput({
  value,
  change,
  blur,
  hasErrors,
  wasBlurred,
  errors,
  className,
  disabled = false,
  type = "text",
  id,
  ...otherProps
}: UseInputResult & MiscellaneousInputProps) {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    change(e.target.value);
  };

  const isInvalid = hasErrors && wasBlurred;

  return (
    <>
      <input
        id={id}
        type={type}
        className={cn("form-input", className)}
        onChange={handleChange}
        onBlur={blur}
        value={value}
        disabled={disabled}
        {...otherProps}
      />
      {isInvalid && <span className="text-primaryRed">{errors[0]}</span>}
    </>
  );
}
export default FormInput;
