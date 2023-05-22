import { ButtonHTMLAttributes, DetailedHTMLProps, ReactNode } from "react";
import cn from "classnames";

const inferredClassName = {
    xs: "rounded px-2 py-1 text-xs",
    sm: "rounded px-2 py-1 text-sm",
    md: "rounded-md px-2.5 py-1.5 text-sm",
    lg: "rounded-md px-3 py-2 text-sm",
    xl: "rounded-md px-3.5 py-2.5 text-sm",
};

export default function SoftButton({
    children,
    size = "md",
    ...buttonProps
}: {
    size?: keyof typeof inferredClassName;
    children: ReactNode;
} & DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
>) {
    return (
        <button
            className={cn(
                inferredClassName[size],
                "bg-blue-50 font-semibold text-blue-600 shadow-sm hover:bg-blue-100"
            )}
            {...buttonProps}
        >
            {children}
        </button>
    );
}
