import Link from 'next/link';
import { PlusIcon } from '@heroicons/react/20/solid';

export default function CVItemsSearch() {
  return (
    <div className="flex m-4 gap-4">
      <input
        type="search"
        placeholder="Пошук за назвою"
        className="form-input p-2 w-full"
      />

      <Link
        href={'/my-cvs/1'}
        className="w-48 inline-flex items-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        <PlusIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
        Додати резюме
      </Link>
    </div>
  );
}
