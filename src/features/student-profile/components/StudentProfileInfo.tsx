import useStudentQuery from "@/hooks/useStudentQuery";
import parseUnknownError from "@/lib/parse-unknown-error";
import StudentProfileInfoSkeleton from "./StudentProfileInfoSkeleton";
import format from "date-fns/format";

export default function StudentProfileInfo({
    accountId,
}: {
    accountId: string;
}) {
    const { data, isLoading, isError, error } = useStudentQuery({ accountId });

    if (isLoading) {
        return <StudentProfileInfoSkeleton />;
    }

    if (isError) {
        return (
            <section aria-labelledby="error-info">
                <div className="bg-white shadow sm:rounded-lg px-4 py-5 sm:px-6">
                    <h2 id="error-title">{"Викинкла помилка"}</h2>
                    <p className="mt-1 text-red-500">
                        {parseUnknownError(error)}
                    </p>
                </div>
            </section>
        );
    }

    const { studentGroup, phone, email, birthDate } = data;

    return (
        <section aria-labelledby="student-information-title">
            <div className="bg-white shadow sm:rounded-lg">
                <div className="px-4 py-5 sm:px-6">
                    <h2
                        id="student-information-title"
                        className="text-lg font-medium leading-6 text-gray-900"
                    >
                        {"Загальна інформація"}
                    </h2>
                </div>
                <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
                    <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
                        <div className="sm:col-span-1">
                            <dt className="text-sm font-medium text-gray-500">
                                {"Група"}
                            </dt>
                            <dd className="mt-1 text-sm text-gray-900">
                                {studentGroup.name}
                            </dd>
                        </div>
                        <div className="sm:col-span-1">
                            <dt className="text-sm font-medium text-gray-500">
                                {"Пошта"}
                            </dt>
                            <dd className="mt-1 text-sm text-gray-900">
                                {email}
                            </dd>
                        </div>
                        {phone ? (
                            <div className="sm:col-span-1">
                                <dt className="text-sm font-medium text-gray-500">
                                    {"Телефон"}
                                </dt>
                                <dd className="mt-1 text-sm text-gray-900">
                                    {phone}
                                </dd>
                            </div>
                        ) : null}
                        {birthDate ? (
                            <div className="sm:col-span-1">
                                <dt className="text-sm font-medium text-gray-500">
                                    {"День народження"}
                                </dt>
                                <dd className="mt-1 text-sm text-gray-900">
                                    {format(new Date(birthDate), "yyyy-MM-dd")}
                                </dd>
                            </div>
                        ) : null}
                    </dl>
                </div>
            </div>
        </section>
    );
}
