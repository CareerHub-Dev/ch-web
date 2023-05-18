import { StudentSubscription } from "@/lib/api/student/schemas";
import Image from "next/image";
import { useRouter } from "next/router";
import { useStudentProfileStore } from "../../store/student-profile-store";
import { getImageWithDefault } from "@/lib/api/image";

export default function FollowedStudentWithAction({
    id,
    firstName,
    lastName,
    photo,
    studentGroup,
}: StudentSubscription) {
    const router = useRouter();
    const closeModal = useStudentProfileStore((s) => s.closeModal);

    const imageUrl = getImageWithDefault(photo, "Student");
    const fullName = `${firstName} ${lastName}`;
    const profileUrl = `/students/${id}`;

    const handleViewProfileClick = () => {
        router.push(profileUrl);
        closeModal();
    };

    return (
        <li className="flex items-center justify-between gap-x-6 py-5">
            <div className="flex gap-x-4">
                <Image
                    width={48}
                    height={48}
                    className="h-12 w-12 flex-none rounded-full bg-gray-50"
                    src={imageUrl}
                    alt={fullName}
                />
                <div className="min-w-0 flex-auto">
                    <p className="text-sm font-semibold leading-6 text-gray-900">
                        {fullName}
                    </p>
                    <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                        {studentGroup.name}
                    </p>
                </div>
            </div>
            <button
                onClick={handleViewProfileClick}
                className="rounded-full bg-white px-2.5 py-1 text-xs font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
            >
                {"Перейти"}
            </button>
        </li>
    );
}
