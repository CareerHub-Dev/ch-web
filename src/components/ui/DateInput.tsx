import { ExclamationCircleIcon } from "@heroicons/react/20/solid";
import { UseDateInputResult } from "@/hooks/useDateInput";
import format from "date-fns/format";
import cn from "classnames";

const defaultClasses = "focus:border-blue-500 focus:ring-blue-500";

const errorClasses =
    "text-red-900 placeholder-red-300 focus:border-red-500 focus:outline-none focus:ring-red-500";

export default function DateInput({
    id,
    value,
    errors,
    change,
    blur,
    wasBlurred,
    disabled,
    name,
}: UseDateInputResult & {
    id: string;
    disabled?: boolean;
    name?: string;
}) {
    const hasErrors = wasBlurred && errors.length > 0;

    const stringDate = format(value, "yyyy-MM-dd");

    return (
        <div>
            <div className="relative rounded-md shadow-sm">
                <input
                    id={id}
                    name={name}
                    type="date"
                    value={stringDate}
                    onChange={change}
                    onBlur={blur}
                    disabled={disabled}
                    className={cn(
                        "block w-full rounded-md border-gray-300 shadow-sm disabled:cursor-not-allowed disabled:border-gray-200 disabled:bg-gray-50 disabled:text-gray-500 sm:text-sm",
                        hasErrors ? errorClasses : defaultClasses
                    )}
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
                ) : null}
            </div>
            {hasErrors ? (
                <p className="mt-2 text-sm text-red-600" id={`${id}-error`}>
                    {errors.at(0)}
                </p>
            ) : null}
        </div>
    );
}
