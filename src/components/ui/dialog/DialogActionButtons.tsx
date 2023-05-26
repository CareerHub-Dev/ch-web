import cn from "classnames";
import LoadingSpinner from "../LoadingSpinner";

const commonButtonClasses =
    "inline-flex w-full justify-center rounded-md border px-4 py-2 text-base font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 sm:w-auto transition-color ease-in-out duration-200 disabled:cursor-not-allowed disabled:opacity-50";
const colors = {
    blue: "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500 text-base",
    red: "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500 text-base",
};

export default function DialogActionButtons({
    cancelText = "Відміна",
    confirmText = "Так",
    confirmationDisabled,
    isLoading,
    confirmColor = "blue",
    onCancel,
    onConfirm,
}: {
    cancelText?: string;
    confirmText?: string;
    confirmationDisabled?: boolean;
    confirmColor?: keyof typeof colors;
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
                    "mt-3 sm:mt-0 text-base",
                    colors[confirmColor],
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
