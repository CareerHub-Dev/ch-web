import {
    EnvelopeIcon,
    EyeIcon,
    EyeSlashIcon,
    KeyIcon,
} from "@heroicons/react/24/outline";
import cn from "classnames";
import {
    ChangeEvent,
    forwardRef,
    useImperativeHandle,
    useRef,
    useState,
} from "react";

export const AuthField = forwardRef<
    {
        focus: () => void;
    },
    {
        id?: string;
        type: "email" | "password";
        label: string;
        onChange: (newValue: string) => void;
        onBlur?: () => void;
        placeholder?: string;
        showError?: boolean;
        errorMessage?: string;
    }
>(function AuthFieldComponent(
    {
        id,
        type,
        label,
        placeholder,
        onChange,
        onBlur,
        showError = false,
        errorMessage,
    },
    ref
) {
    const inputRef = useRef<HTMLInputElement>(null);
    const [inputType, setInputType] = useState<typeof type | "text">(type);

    const focusInput = () => {
        inputRef.current!.focus();
    };

    useImperativeHandle(ref, () => {
        return {
            focus: focusInput,
        };
    });

    const PrimaryIcon = type === "email" ? EnvelopeIcon : KeyIcon;

    const PasswordVisibilityStatusIcon =
        inputType === "password" ? EyeSlashIcon : EyeIcon;

    const togglePasswordVisibility = () => {
        setInputType((prevState) =>
            prevState === "password" ? "text" : "password"
        );
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        onChange(e.target.value);
    };

    return (
        <div>
            <label
                htmlFor={id}
                className="block text-sm font-medium text-gray-700"
            >
                {label}
            </label>
            <div className="relative mt-1 rounded-md shadow-sm">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <PrimaryIcon
                        className="h-5 w-5 text-gray-400"
                        aria-hidden="true"
                    />
                </div>
                <input
                    id={id}
                    name={id}
                    type={inputType}
                    autoComplete={id}
                    ref={inputRef}
                    onChange={handleChange}
                    onBlur={onBlur}
                    placeholder={placeholder}
                    required
                    className={cn(
                        "pl-10 pr-10 px-3 py-2 block w-full appearance-none shadow-sm rounded-md border focus:outline-none sm:text-sm transition-all ease-in-out duration-200",
                        showError
                            ? "border-red-300 text-red-900 placeholder-red-300 focus:border-red-500 focus:ring-red-500"
                            : "border-gray-300 placeholder-gray-400  focus:border-blue-500 focus:ring-blue-500"
                    )}
                />
                {inputType !== "email" && (
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                        <PasswordVisibilityStatusIcon
                            className="h-5 w-5 text-gray-400 cursor-pointer"
                            role="button"
                            onClick={togglePasswordVisibility}
                        />
                    </div>
                )}
            </div>
            {showError ? (
                <p className="mt-2 text-sm text-red-600" id={`${id}-error`}>
                    {errorMessage}
                </p>
            ) : null}
        </div>
    );
});
