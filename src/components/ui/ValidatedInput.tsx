import {
  ExclamationCircleIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/20/solid";
import { ChangeEvent } from "react";
import cn from "classnames";

const defaultClasses = "focus:border-blue-500 focus:ring-blue-500";

const errorClasses =
  "text-red-900 placeholder-red-300 focus:border-red-500 focus:outline-none focus:ring-red-500";

const warningClasses =
  "text-orange-900 placeholder-orange-300 focus:border-orange-500 focus:outline-none focus:ring-orange-500";

export default function ValidatedInput({
  id,
  label,
  value,
  errors,
  warnings,
  onChange,
  onBlur,
  wasBlurred,
  placeholder,
  disabled,
  name,
}: Inputs.StringInput & {
  id: string;
  label?: string;
  onChange: (value: string) => void;
  onBlur: () => void;
  placeholder?: string;
  disabled?: boolean;
  name?: string;
}) {
  const hasErrors = wasBlurred && errors.length > 0;
  const hasWarnings = wasBlurred && warnings.length > 0;
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <>
      {label ? (
        <label
          htmlFor={id}
          className="block sm:text-sm font-medium text-gray-700 mb-1"
        >
          {label}
        </label>
      ) : null}
      <div>
        <div className="relative rounded-md shadow-sm">
          <input
            type="text"
            id={id}
            className={cn(
              "block w-full rounded-md border-gray-300 shadow-sm disabled:cursor-not-allowed disabled:border-gray-200 disabled:bg-gray-50 disabled:text-gray-500 sm:text-sm",
              hasErrors
                ? errorClasses
                : hasWarnings
                ? warningClasses
                : defaultClasses
            )}
            value={value}
            onChange={handleChange}
            onBlur={onBlur}
            placeholder={placeholder}
            disabled={disabled}
            name={name}
            aria-invalid={hasErrors ? "true" : "false"}
            aria-describedby={hasErrors ? `${id}-error` : undefined}
          />
          {hasErrors ? (
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
              <ExclamationCircleIcon
                className="h-5 w-5 text-red-500"
                aria-hidden="true"
              />
            </div>
          ) : hasWarnings ? (
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
              <ExclamationTriangleIcon
                className="h-5 w-5 text-orange-500"
                aria-hidden="true"
              />
            </div>
          ) : null}
        </div>
        {hasErrors ? (
          <p className="mt-2 text-sm text-red-600" id={`${id}-error`}>
            {errors.at(0)}
          </p>
        ) : hasWarnings ? (
          <p className="mt-2 text-sm text-orange-600" id={`${id}-warning`}>
            {warnings.at(0)}
          </p>
        ) : null}
      </div>
    </>
  );
}
