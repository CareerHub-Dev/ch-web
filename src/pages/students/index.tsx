import CommonLayout from "@/components/layout/CommonLayout";
import { protectedSsr } from "@/lib/protected-ssr";
import { useProtectedPaginatedQuery } from "@/hooks/useProtectedPaginatedQuery";
import { getStudents } from "@/lib/api/student";
import parseUnknownError from "@/lib/parse-unknown-error";
import { Fragment, useState } from "react";
import { useDebounce } from "usehooks-ts";
import StudentCard from "@/features/students-feed/components/StudentCard";

export default function StudentsPage() {
    const [search, setSearch] = useState("");
    const debouncedSearch = useDebounce(search, 200);
    const { data, isLoading, isError, error } = useProtectedPaginatedQuery({
        queryKey: ["students", debouncedSearch],
        getItems: getStudents,
        params: {
            pageSize: 36,
            search: debouncedSearch,
        },
    });

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
    };
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-white py-4 shadow-md rounded-md mb-4">
            <div className="relative my-4 flex items-center">
                <input
                    type="text"
                    name="search"
                    id="search"
                    value={search}
                    onChange={handleSearchChange}
                    placeholder={"Пошук"}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                />
            </div>
            <div className="my-4">
                {isLoading ? (
                    <p>Loading...</p>
                ) : isError ? (
                    <p className="text-center text-red-500">
                        {parseUnknownError(error)}
                    </p>
                ) : data.pages.at(0)?.data.length === 0 ? (
                    <p className="text-center">{"Нічого не знайдено"}</p>
                ) : (
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        {data.pages.map((page, pageIndex) => (
                            <Fragment key={pageIndex}>
                                {page.data.map((student) => (
                                    <StudentCard
                                        student={student}
                                        key={student.id}
                                    />
                                ))}
                            </Fragment>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

StudentsPage.getLayout = CommonLayout;

export const getServerSideProps = protectedSsr({
    allowedRoles: ["Student", "Company"],
});
