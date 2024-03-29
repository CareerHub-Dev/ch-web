import { ChevronUpDownIcon } from "@heroicons/react/20/solid";
import LoadingSpinner from "@/components/ui/LoadingSpinner";

export default function ItemSelectionLoadingSkeleton() {
  return (
    <button
      disabled
      className="relative w-full cursor-default rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 text-left shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 sm:text-sm"
    >
      <span className="block">
        <LoadingSpinner className="ml-2.5f h-5 w-5 text-blue-500" />
      </span>
      <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
        <ChevronUpDownIcon
          className="h-5 w-5 text-gray-400"
          aria-hidden="true"
        />
      </span>
    </button>
  );
}
