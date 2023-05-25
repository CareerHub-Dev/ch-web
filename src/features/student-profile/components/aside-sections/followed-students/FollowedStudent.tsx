import { getImageWithDefault } from "@/lib/api/image";
import Image from "next/image";
import Link from "next/link";
import { ChevronRightIcon } from "@heroicons/react/24/solid";

export default function FollowedStudent({
    id,
    firstName,
    lastName,
    studentGroup,
    photo,
}: {
    id: string;
    firstName: string;
    lastName: string;
    studentGroup: {
        name: string;
        id: string;
    };
    isFollowed: boolean;
    photo?: string | null | undefined;
}) {
    const fullName = `${firstName} ${lastName}`;
    const studentProfileLink = `/students/${id}`;
    const imageSource = getImageWithDefault(photo, "Student");

    return (
        <li className="relative flex justify-between gap-x-6 p-2 hover:bg-blue-50 rounded-md transition-all duration-200">
            <div className="flex gap-x-4">
                <Image
                    width={32}
                    height={32}
                    className="h-8 w-8 rounded-full"
                    src={imageSource}
                    alt={fullName}
                />
                <div className="min-w-0 flex-auto">
                    <p className="text-sm font-semibold leading-6 text-gray-900">
                        <Link
                            href={studentProfileLink}
                            className="focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 focus:ring-offset-gray-100 transition-all duration-200 rounded-md"
                        >
                            <span className="absolute inset-x-0 -top-px bottom-0" />
                            {fullName}
                        </Link>
                    </p>
                    <p className="mt-1 flex text-xs leading-5 text-gray-500">
                        {studentGroup.name}
                    </p>
                </div>
            </div>
            <div className="flex items-center gap-x-4">
                <ChevronRightIcon
                    className="h-5 w-5 flex-none text-blue-600"
                    aria-hidden="true"
                />
            </div>
        </li>
    );
}
