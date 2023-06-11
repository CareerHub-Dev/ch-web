import { type ChangeEvent } from "react";
import {
  ExclamationCircleIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/20/solid";
import cn from "classnames";

const defaultClasses =
  "focus-within:border-blue-500 focus-within:ring-blue-500";

const errorClasses = "focus-within:border-red-500 focus-within:ring-red-500";

const warningClasses =
  "focus-within:border-orange-500 focus-within:ring-orange-500";

export default function ValidatedTextArea({
  id,
  value,
  errors,
  warnings,
  onChange,
  onBlur,
  wasBlurred,
  disabled,
}: Inputs.StringInput & {
  id: string;
  onChange: (value: string) => void;
  onBlur: () => void;
  disabled?: boolean;
}) {
  const hasErrors = wasBlurred && errors.length > 0;
  const hasWarnings = wasBlurred && warnings.length > 0;
  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e.target.value);
  };

  return (
    <div className="relative">
      <div
        className={cn(
          "overflow-hidden max-w-lg rounded-lg border border-gray-300 shadow-sm focus-within:ring-1",
          hasErrors
            ? errorClasses
            : hasWarnings
            ? warningClasses
            : defaultClasses
        )}
      >
        <textarea
          id={id}
          name={id}
          rows={4}
          className="block w-full resize-none border-0 py-3 focus:ring-0 sm:text-sm disabled:text-gray-300"
          value={value}
          onChange={handleChange}
          onBlur={onBlur}
          disabled={disabled}
        />

        {/* Spacer element to match the height of the toolbar */}
        <div className="py-2" aria-hidden="true">
          {/* Matches height of button in toolbar (1px border + 36px content height) */}
          <div className="py-px">
            <div className="h-9" />
          </div>
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-0 flex items-center space-x-3 py-2 pl-3 pr-2 sm:text-sm">
        {hasErrors ? (
          <>
            <ExclamationCircleIcon
              className="h-5 w-5 text-red-500"
              aria-hidden="true"
            />
            <span className="text-red-500">{errors.at(0)}</span>
          </>
        ) : hasWarnings ? (
          <>
            <ExclamationTriangleIcon
              className="h-5 w-5 text-orange-500"
              aria-hidden="true"
            />
            <span className="text-orange-500">{warnings.at(0)}</span>
          </>
        ) : null}
      </div>
    </div>
  );
}
