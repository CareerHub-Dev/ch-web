import { CompanySubscription } from "@/lib/api/student/schemas";

const person = {
    name: "Leslie Alexander",
    email: "leslie.alexander@example.com",
    imageUrl: "/default-avatar.png",
    href: "#",
};
export default function FollowedCompanyWithAction(props: CompanySubscription) {
    return (
        <li
            key={person.email}
            className="flex items-center justify-between gap-x-6 py-5"
        >
            <div className="flex gap-x-4">
                <img
                    className="h-12 w-12 flex-none rounded-full bg-gray-50"
                    src={person.imageUrl}
                    alt=""
                />
                <div className="min-w-0 flex-auto">
                    <p className="text-sm font-semibold leading-6 text-gray-900">
                        {person.name}
                    </p>
                    <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                        {person.email}
                    </p>
                </div>
            </div>
            <a
                href={person.href}
                className="rounded-full bg-white px-2.5 py-1 text-xs font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
            >
                View
            </a>
        </li>
    );
}
