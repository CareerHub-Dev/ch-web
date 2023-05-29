import { ButtonHTMLAttributes, DetailedHTMLProps, ReactNode } from "react";
import cn from "classnames";

const sizeClasses = {
  xs: "rounded px-2 py-1 text-xs",
  sm: "rounded px-2 py-1 text-sm",
  md: "rounded-md px-2.5 py-1.5 text-sm",
  lg: "rounded-md px-3 py-2 text-sm",
  xl: "rounded-md px-3.5 py-2.5 text-sm",
};

export default function SecondaryButton({
  children,
  size = "md",
  className,
  ...buttonProps
}: {
  size?: keyof typeof sizeClasses;
  children: ReactNode;
} & DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>) {
  return (
    <button
      className={cn(
        "block transition-colors duration-200 bg-white text-center font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 ",
        sizeClasses[size],
        className
      )}
      {...buttonProps}
    >
      {children}
    </button>
  );
}
