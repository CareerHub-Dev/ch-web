import classNames from "classnames";

export default function JobOfferCompanyTabButton({
  name,
  id,
  isCurrent,
  count,
  onClick,
}: {
  name: string;
  id: string;
  isCurrent: boolean;
  count?: number | undefined;
  onClick: (tabId: string) => void;
}) {
  return (
    <a
      role="button"
      onClick={onClick.bind(null, id)}
      className={classNames(
        isCurrent
          ? "border-blue-500 text-blue-600"
          : "border-transparent text-gray-500 hover:border-gray-200 hover:text-gray-700",
        "flex whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium"
      )}
    >
      {name}
      {count ? (
        <span
          className={classNames(
            isCurrent
              ? "bg-blue-100 text-blue-600"
              : "bg-gray-100 text-gray-900",
            "ml-3 hidden rounded-full py-0.5 px-2.5 text-xs font-medium md:inline-block"
          )}
        >
          {count}
        </span>
      ) : null}
    </a>
  );
}
