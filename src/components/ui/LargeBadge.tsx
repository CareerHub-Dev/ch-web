export default function LargeBadge({
  name,
  onRemove,
}: {
  name: string;
  onRemove?: () => void;
}) {
  return (
    <span className="inline-flex items-center rounded-full bg-blue-100 py-0.5 pl-2.5 pr-1 text-sm font-medium text-blue-700">
      {name}
      {!!onRemove ? (
        <button
          type="button"
          onClick={onRemove}
          className="ml-0.5 inline-flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full text-blue-400 hover:bg-blue-200 hover:text-blue-500 focus:bg-blue-500 focus:text-white focus:outline-none"
        >
          <span className="sr-only">{`Видалити ${name}`}</span>
          <svg
            className="h-2 w-2"
            stroke="currentColor"
            fill="none"
            viewBox="0 0 8 8"
          >
            <path
              strokeLinecap="round"
              strokeWidth="1.5"
              d="M1 1l6 6m0-6L1 7"
            />
          </svg>
        </button>
      ) : null}
    </span>
  );
}
