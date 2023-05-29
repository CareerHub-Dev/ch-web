import cn from "classnames";
import Link from "next/link";

export default function NavigationLink(props: {
  href: string;
  isActive: boolean;
  text: string;
}) {
  return (
    <Link
      href={props.href}
      className={cn(
        props.isActive
          ? "border-blue-500 text-gray-900"
          : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300",
        "inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
      )}
      aria-current={props.isActive ? "page" : undefined}
    >
      {props.text}
    </Link>
  );
}
