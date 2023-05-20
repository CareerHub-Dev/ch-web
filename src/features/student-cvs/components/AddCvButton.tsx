import { PlusIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

export function AddCvButton() {
    return (
        <Link
            href={"/my-cvs/create"}
            className="relative inline-flex items-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
            <PlusIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
            {"Додати резюме"}
        </Link>
    );
}
