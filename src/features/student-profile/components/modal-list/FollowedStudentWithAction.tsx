import { StudentSubscription } from "@/lib/api/student/schemas";
import Image from "next/image";
import { getImageWithDefault } from "@/lib/api/image";
import Link from "next/link";
import { ChevronRightIcon } from "@heroicons/react/24/solid";

export default function FollowedStudentWithAction({
    id,
    firstName,
    lastName,
    photo,
    studentGroup,
    email,
}: StudentSubscription) {
    const imageUrl = getImageWithDefault(photo, "Student");
    const fullName = `${firstName} ${lastName}`;
    const profileUrl = `/students/${id}`;

    return (
        <li className="relative flex justify-between py-5">
            <div className="flex gap-x-4 pr-6 sm:w-1/2 sm:flex-none">
                <Image
                    width={48}
                    height={48}
                    className="h-12 w-12 flex-none rounded-full bg-gray-50"
                    src={imageUrl}
                    alt={fullName}
                />
                <div className="min-w-0 flex-auto">
                    <p className="text-sm font-semibold leading-6 text-gray-900">
                        <Link href={profileUrl}>
                            <span className="absolute inset-x-0 -top-px bottom-0" />
                            {fullName}
                        </Link>
                    </p>
                    <p className="mt-1 flex text-xs leading-5 text-gray-500">
                        <a
                            href={`mailto:${email}`}
                            className="relative truncate hover:underline"
                        >
                            {email}
                        </a>
                    </p>
                </div>
            </div>
            <div className="flex items-center justify-between gap-x-4 sm:w-1/2 sm:flex-none">
                <div className="hidden sm:block">
                    <p className="text-sm leading-6 text-gray-900">
                        {studentGroup.name}
                    </p>
                </div>
                <ChevronRightIcon
                    className="h-5 w-5 flex-none text-gray-400"
                    aria-hidden="true"
                />
            </div>
        </li>
    );
}
