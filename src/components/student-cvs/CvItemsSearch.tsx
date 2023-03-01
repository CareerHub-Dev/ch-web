import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { CvItemsSortButton } from './CvItemsSortButton';
import { useMyCvsStore } from '@/context/my-cvs-store';
import { type ChangeEvent } from 'react';

export const CvItemsSearch = () => {
  const searchTerm = useMyCvsStore((s) => s.searchTerm);
  const setSearchTerm = useMyCvsStore((s) => s.setSearchTerm);

  const handleSearchTermChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
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
            value={searchTerm}
            onChange={handleSearchTermChange}
            className="block w-full rounded-none rounded-l-md border-gray-300 pl-10 focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            placeholder="Моє резюме"
          />
        </div>
        <CvItemsSortButton />
      </div>
    </div>
  );
};
