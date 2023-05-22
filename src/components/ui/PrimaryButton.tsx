import { ButtonHTMLAttributes, DetailedHTMLProps, ReactNode } from "react";
import cn from "classnames";

const sizeClasses = {
    xs: "rounded px-2 py-1 text-xs",
    sm: "rounded px-2 py-1 text-sm",
    md: "rounded-md px-2.5 py-1.5 text-sm",
    lg: "rounded-md px-3 py-2 text-sm",
    xl: "rounded-md px-3.5 py-2.5 text-sm",
};

const variantClasses = {
    blue: "bg-blue-500 text-white hover:bg-blue-400 focus-visible:outline-blue-500",
    indigo: "bg-indigo-500 text-white hover:bg-indigo-400 focus-visible:outline-indigo-500",
    red: "bg-red-500 text-white hover:bg-red-400 focus-visible:outline-red-500",
};

export default function PrimaryButton({
    children,
    size = "md",
    variant = "blue",
    className,
    ...buttonProps
}: {
    size?: keyof typeof sizeClasses;
    variant?: keyof typeof variantClasses;
    children: ReactNode;
} & DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
>) {
    return (
        <button
            className={cn(
                "block font-semibold shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ",
                sizeClasses[size],
                variantClasses[variant],
                className
            )}
            {...buttonProps}
        >
            {children}
        </button>
    );
}
