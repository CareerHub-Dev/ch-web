import { ExclamationCircleIcon } from '@heroicons/react/20/solid';
import cn from 'classnames';
import { type ChangeEvent } from 'react';

const errorClasses =
  'text-red-900 placeholder-red-300 focus:border-red-500 focus:outline-none focus:ring-red-500';

export default function ValidatedInput({
  id,
  label,
  value,
  errors,
  onChange,
}: Inputs.StringInput & {
  id: string;
  label?: string;
  onChange: (value: string) => void;
}) {
  const hasErrors = errors.length > 0;
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <>
      {label && (
        <label
          htmlFor={id}
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          {label}
        </label>
      )}
      <div>
        <div className="relative rounded-md shadow-sm">
          <input
            type="text"
            id={id}
            className={cn(
              'block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500',
              hasErrors && errorClasses
            )}
            value={value}
            onChange={handleChange}
            aria-invalid={hasErrors ? 'true' : 'false'}
            aria-describedby={hasErrors ? `${id}-error` : undefined}
          />
          {hasErrors && (
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
              <ExclamationCircleIcon
                className="h-5 w-5 text-red-500"
                aria-hidden="true"
              />
            </div>
          )}
        </div>
        {hasErrors && (
          <p className="mt-2 text-sm text-red-600" id={`${id}-error`}>
            {errors.at(0)}
          </p>
        )}
      </div>
    </>
  );
}
