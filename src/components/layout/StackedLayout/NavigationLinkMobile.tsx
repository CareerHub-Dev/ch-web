import { Disclosure } from "@headlessui/react";
import Link from "next/link";
import cn from "classnames";

export default function NavigationLinkMobile(props: {
    isActive: boolean;
    text: string;
    href: string;
}) {
    return (
        <Disclosure.Button
            as={Link}
            href={props.href}
            className={cn(
                props.isActive
                    ? "bg-blue-50 border-blue-500 text-blue-700"
                    : "border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800",
                "block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
            )}
            aria-current={props.isActive ? "page" : undefined}
        >
            {props.text}
        </Disclosure.Button>
    );
}
