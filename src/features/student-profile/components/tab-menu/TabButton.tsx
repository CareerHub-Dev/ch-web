import cn from "classnames";

export default function TabButton({
    query,
    name,
    current,
    tabIndex,
    lastIndex,
    onClick,
}: {
    query: string;
    name: string;
    current: boolean;
    tabIndex: number;
    lastIndex: number;
    onClick: (query: string) => void;
}) {
    return (
        <button
            onClick={() => onClick(query)}
            className={cn(
                current ? "text-gray-900" : "text-gray-500 hover:text-gray-700",
                tabIndex === 0 ? "rounded-l-lg" : "",
                tabIndex === lastIndex ? "rounded-r-lg" : "",
                "group relative min-w-0 flex-1 overflow-hidden bg-white py-4 px-4 text-center text-sm font-medium hover:bg-gray-50 focus:z-10"
            )}
            aria-current={current ? "page" : undefined}
        >
            <span>{name}</span>
            <span
                aria-hidden="true"
                className={cn(
                    current ? "bg-blue-500" : "bg-transparent",
                    "absolute inset-x-0 bottom-0 h-0.5"
                )}
            />
        </button>
    );
}
