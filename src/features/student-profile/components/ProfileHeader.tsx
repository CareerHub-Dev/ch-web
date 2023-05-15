import Link from "next/link";
import Image from "next/image";
import { getImage } from "@/lib/api/image";
import useStudentQuery from "@/hooks/useStudentQuery";

export default function ProfileHeader({
    isSelf,
    studentId,
}: {
    isSelf: boolean;
    studentId: string;
}) {
    const { data, isLoading } = useStudentQuery({
        accountId: studentId,
    });

    return (
        <div className="mx-auto max-w-3xl px-4 sm:px-6 md:flex md:items-center md:justify-between md:space-x-5 lg:max-w-7xl lg:px-8">
            <div className="flex items-center space-x-5">
                <div className="flex-shrink-0">
                    <div className="relative">
                        {isLoading ? (
                            <div className="w-16 h-16 bg-gray-300 rounded-full animate-pulse" />
                        ) : (
                            <Image
                                className="h-16 w-16 rounded-full"
                                width={64}
                                height={64}
                                src={
                                    data?.photo
                                        ? getImage(data.photo)
                                        : "/default-avatar.png"
                                }
                                alt={"Student photo"}
                            />
                        )}
                        <span
                            className="absolute inset-0 rounded-full shadow-inner"
                            aria-hidden="true"
                        />
                    </div>
                </div>
                <div>
                    {isLoading ? (
                        <div className="grid grid-cols-3 gap-4 animate-pulse w-64">
                            <div className="h-6 bg-gray-300 rounded col-span-2" />
                            <div className="h-6 bg-gray-300 rounded col-span-1" />
                        </div>
                    ) : (
                        <h1 className="text-2xl font-bold text-gray-900">
                            {`${data?.firstName} ${data?.lastName}`}
                        </h1>
                    )}
                </div>
            </div>
            {isSelf && (
                <div className="justify-stretch mt-6 flex flex-col-reverse space-y-4 space-y-reverse sm:flex-row-reverse sm:justify-end sm:space-y-0 sm:space-x-3 sm:space-x-reverse md:mt-0 md:flex-row md:space-x-3">
                    <Link
                        href={"/me/edit"}
                        className="inline-flex items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-100"
                    >
                        Редагувати
                    </Link>
                </div>
            )}
        </div>
    );
}
