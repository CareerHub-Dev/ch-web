import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import PlusIcon from "@heroicons/react/24/solid/PlusIcon";
import Link from "next/link";
import { ChangeEvent } from "react";
import cn from "classnames";

export function CvItemsSearch({
  search,
  setSearch,
  withAddButton = true,
}: {
  search: string;
  setSearch: (search: string) => void;
  withAddButton?: boolean;
}) {
  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  return (
    <div className="mb-5">
      <label
        htmlFor="search"
        className="block text-sm font-medium text-gray-700"
      >
        Пошук за назвою
      </label>
      <div className="mt-1 flex rounded-md shadow-sm">
        <div className="relative flex flex-grow items-stretch focus-within:z-10">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <MagnifyingGlassIcon
              className="h-5 w-5 text-gray-400"
              aria-hidden="true"
            />
          </div>
          <input
            type="search"
            name="search"
            id="search"
            value={search}
            onChange={handleSearchChange}
            className={cn(
              "block w-full border-0 rounded-none ring-1 ring-inset ring-gray-300 pl-10 focus:ring-2 focus:ring-inset focus:ring-blue-500 sm:text-sm",
              withAddButton ? "rounded-l-md" : "rounded-l-md rounded-r-md"
            )}
            placeholder="Моє резюме"
          />
        </div>
        {withAddButton ? (
          <Link
            href="/my-cvs/create"
            className="relative -ml-px inline-flex items-center gap-x-1.5 rounded-r-md px-3 py-2 sm:text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
          >
            <PlusIcon className="inline-block w-4 h-4" />
            <span className="hidden sm:inline">{"Створити нове"}</span>
          </Link>
        ) : null}
      </div>
    </div>
  );
}
