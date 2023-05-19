import { CompanySubscription } from "@/lib/api/student/schemas";
import { ChevronRightIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import Image from "next/image";
import { getImageWithDefault } from "@/lib/api/image";

export default function FollowedCompanyWithAction({
    id,
    name,
    email,
    logo,
}: CompanySubscription) {
    const imageUrl = getImageWithDefault(logo, "Company");
    const profileUrl = `/companies/${id}`;
    return (
        <li className="relative flex justify-between py-5">
            <div className="flex gap-x-4 pr-6 sm:w-1/2 sm:flex-none">
                <Image
                    width={48}
                    height={48}
                    className="h-12 w-12 flex-none rounded-full bg-gray-50"
                    src={imageUrl}
                    alt={name}
                />
                <div className="min-w-0 flex-auto">
                    <p className="text-sm font-semibold leading-6 text-gray-900">
                        <Link href={profileUrl}>
                            <span className="absolute inset-x-0 -top-px bottom-0" />
                            {name}
                        </Link>
                    </p>
                    <p className="mt-1 flex text-xs leading-5 text-gray-500">
                        <span className="relative truncate">{email}</span>
                    </p>
                </div>
            </div>
            <ChevronRightIcon
                className="h-5 w-5 flex-none text-gray-400"
                aria-hidden="true"
            />
        </li>
    );
}
