import { ChevronUpDownIcon } from "@heroicons/react/20/solid";

export default function LockedJobPositions() {
    return (
        <>
            <label className="block text-sm font-medium text-gray-700">
                {"Бажана посада"}
            </label>

            <div className="relative mt-1">
                <button
                    disabled
                    className="relative w-full cursor-default rounded-md border border-gray-300 bg-gray-100 py-2 pl-3 pr-10 text-left shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 sm:text-sm disabled:cursor-not-allowed"
                >
                    <span className="ml-2.5f h-5 w-5 text-gray-500">
                        {"Спочатку оберіть напрямок"}
                    </span>

                    <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                        <ChevronUpDownIcon
                            className="h-5 w-5 text-gray-400"
                            aria-hidden="true"
                        />
                    </span>
                </button>
            </div>
        </>
    );
}
