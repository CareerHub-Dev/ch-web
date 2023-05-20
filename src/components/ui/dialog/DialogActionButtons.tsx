import cn from "classnames";
import LoadingSpinner from "../LoadingSpinner";

const commonButtonClasses =
    "inline-flex w-full justify-center rounded-md border px-4 py-2 text-base font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 sm:w-auto transition-all ease-in-out duration-200 disabled:cursor-not-allowed disabled:opacity-50";

export default function DialogActionButtons({
    cancelText,
    confirmText,
    confirmationDisabled,
    isLoading,
    confirmClasses,
    onCancel,
    onConfirm,
}: {
    cancelText: string;
    confirmText: string;
    confirmationDisabled?: boolean;
    confirmClasses?: string;
    isLoading?: boolean;
    onCancel: () => void;
    onConfirm: () => void;
}) {
    return (
        <div className="mt-6 sm:mt-8 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
            <button
                type="button"
                className={cn(
                    "border-gray-300 bg-white text-gray-700 hover:bg-gray-50 focus:ring-blue-500",
                    commonButtonClasses
                )}
                onClick={onCancel}
            >
                {cancelText}
            </button>
            <button
                type="button"
                className={cn(
                    "mt-3 sm:mt-0",
                    confirmClasses ||
                        "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500 text-base",
                    commonButtonClasses
                )}
                onClick={onConfirm}
                disabled={confirmationDisabled}
            >
                {isLoading ? (
                    <LoadingSpinner className="w-6 h-6 text-white" />
                ) : (
                    confirmText
                )}
            </button>
        </div>
    );
}
