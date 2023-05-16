import { type Student } from "@/lib/schemas/Student";
import Image from "next/image";
import Link from "next/link";
import { getImage } from "@/lib/api/image";

export default function StudentCard({ student }: { student: Student }) {
    const fullName = `${student.firstName} ${student.lastName}`;
    const studentProfileLink = `/students/${student.id}`;
    return (
        <div className="relative flex items-center space-x-3 rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:border-gray-400">
            <div className="flex-shrink-0">
                <Image
                    className="h-10 w-10 rounded-full"
                    height={40}
                    width={40}
                    src={
                        student.photo
                            ? getImage(student.photo)
                            : "/default-avatar.png"
                    }
                    alt={fullName}
                />
            </div>
            <div className="min-w-0 flex-1">
                <Link href={studentProfileLink} className="focus:outline-none">
                    <span className="absolute inset-0" aria-hidden="true" />
                    <p className="text-sm font-medium text-gray-900">
                        {fullName}
                    </p>
                    <p className="truncate text-sm text-gray-500">
                        {student.studentGroup.name}
                    </p>
                </Link>
            </div>
        </div>
    );
}
