import { ArrowRightIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";

export default function FollowedStudent(props: {
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
    const imageSource = props.photo || "/default-avatar.png";
    const studentProfileHref = `/student-profile/${props.id}`;
    const studentFullName = `${props.firstName} ${props.lastName}`;

    return (
        <li className="flex space-x-3 py-4">
            <Link href={studentProfileHref}>
                <div className="flex-shrink-0">
                    <Image
                        width={32}
                        height={32}
                        className="h-8 w-8 rounded-full"
                        src={imageSource}
                        alt={`Avatar: ${studentFullName}`}
                    />
                </div>
                <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-gray-900">
                        {studentFullName}
                    </p>
                    <p className="text-sm text-gray-500">
                        {props.studentGroup.name}
                    </p>
                </div>
                <div className="flex-shrink-0">
                    <div className="inline-flex items-center rounded-full px-3 py-0.5 text-sm font-medium text-indigo-700 hover:text-indigo-800">
                        <ArrowRightIcon
                            className="-ml-1 mr-0.5 h-5 w-5"
                            aria-hidden="true"
                        />
                    </div>
                </div>
            </Link>
        </li>
    );
}
