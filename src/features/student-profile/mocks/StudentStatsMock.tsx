import {
    CursorArrowRaysIcon,
    EnvelopeOpenIcon,
    UsersIcon,
} from "@heroicons/react/24/outline";

const stats = [
    {
        id: 1,
        name: "Підписники",
        stat: "2",
        icon: UsersIcon,
    },
    {
        id: 2,
        name: "Відстежувані вакансії",
        stat: "0",
        icon: EnvelopeOpenIcon,
    },
    {
        id: 3,
        name: "Відстежувані компанії",
        stat: "1",
        icon: CursorArrowRaysIcon,
    },
];

export default function StudentStatsMock() {
    return (
        <dl className="grid grid-cols-1 gap-5">
            {stats.map((item) => (
                <div
                    key={item.id}
                    className="relative overflow-hidden rounded-lg bg-white px-4 pt-5 pb-12 shadow sm:px-6 sm:pt-6"
                >
                    <dt>
                        <div className="absolute rounded-md bg-indigo-500 p-3">
                            <item.icon
                                className="h-6 w-6 text-white"
                                aria-hidden="true"
                            />
                        </div>
                        <p className="ml-16 truncate text-sm font-medium text-gray-500">
                            {item.name}
                        </p>
                    </dt>
                    <dd className="ml-16 flex items-baseline pb-6 sm:pb-7">
                        <p className="text-2xl font-semibold text-gray-900">
                            {item.stat}
                        </p>
                        <div className="absolute inset-x-0 bottom-0 bg-gray-50 px-4 py-4 sm:px-6">
                            <div className="text-sm">
                                <a
                                    href="#"
                                    className="font-medium text-indigo-600 hover:text-indigo-500"
                                >
                                    {" "}
                                    Більше
                                    <span className="sr-only">
                                        {" "}
                                        {item.name}{" "}
                                    </span>
                                </a>
                            </div>
                        </div>
                    </dd>
                </div>
            ))}
        </dl>
    );
}
