import CommonLayout from "@/components/layout/CommonLayout";
import NavigationMenu from "@/components/student-profile/NavigationMenu";
import StudentAvatar from "@/components/student-profile/StudentAvatar";
import StudentInfo from "@/components/student-profile/StudentInfo";
import StudentSubscriptions from "@/components/student-profile/StudentSubscriptions";
import StudentSubscriptionsCompanies from "@/components/student-profile/StudentSubscriptionsCompanies";
import StudentSubscriptionsJobOffers from "@/components/student-profile/StudentSubscriptionsJobOffers";
import StudentSubscriptionsStudents from "@/components/student-profile/StudentSubscriptionsStudents";
import StudentWorkExperience from "@/components/student-profile/StudentWorkExperience";
import CenteredLoadingSpinner from "@/components/ui/CenteredLoadingSpinner";
import { useProtectedQuery } from "@/hooks/useProtectedQuery";
import useShallowRoutes from "@/hooks/useShallowRoutes";
import { getStudent } from "@/lib/api/student";
import { protectedSsr } from "@/lib/protected-ssr";
import Head from "next/head";
import Link from "next/link";
import { useState } from "react";
import { useDebounce } from "usehooks-ts";
import { type InferGetServerSidePropsType } from "next";

const navigationItems = [
    {
        title: "Досвід роботи",
        section: "experience",
    },
    {
        title: "Вакансії",
        section: "jobOffers",
    },
    {
        title: "Компанії",
        section: "companies",
    },
    {
        title: "Студенти",
        section: "students",
    },
    {
        title: "Підписники",
        section: "subscribers",
    },
];

const defaultOrderByOption = {
    label: "За замовченням",
    value: "",
};

const studentOrderByOptions = [
    defaultOrderByOption,
    {
        label: "За ім'ям",
        value: "firstName",
    },
    {
        label: "За прізвищем",
        value: "lastName",
    },
    {
        label: "За групою",
        value: "studentGroup.name",
    },
];

const companyOrderByOptions = [
    defaultOrderByOption,
    {
        label: "За назвою",
        value: "name",
    },
    {
        label: "За назвою зворотньо",
        value: "name DESC",
    },
];

const jobOfferOrderByOptions = [
    defaultOrderByOption,
    {
        label: "За назвою",
        value: "title",
    },
];

const StudentProfilePage: NextPageWithLayout<
    InferGetServerSidePropsType<typeof getServerSideProps>
> = ({ isSelf, studentId }) => {
    const { isLoading, data, isError } = useProtectedQuery(
        ["student", studentId],
        getStudent(studentId)
    );
    const [studentSearch, setStudentSearch] = useState("");
    const [companySearch, setCompanySearch] = useState("");
    const [jobOfferSearch, setJobOfferSearch] = useState("");
    const debouncedStudentSearch = useDebounce(studentSearch, 500);
    const debouncedCompanySearch = useDebounce(companySearch, 500);
    const debouncedJobOfferSearch = useDebounce(jobOfferSearch, 500);
    const [selectedStudentOrderByOption, setSelectedStudentOrderByOption] =
        useState(studentOrderByOptions.at(0));
    const [selectedCompanyOrderByOption, setSelectedCompanyOrderByOption] =
        useState(companyOrderByOptions.at(0));
    const [selectedJobOfferOrderByOption, setSelectedJobOfferOrderByOption] =
        useState(jobOfferOrderByOptions.at(0));

    const { currentSection, changeSection } = useShallowRoutes({
        defaultSection: "experience",
    });

    if (isLoading) {
        return <CenteredLoadingSpinner />;
    }

    if (isError) {
        return <div>Помилка завантаження</div>;
    }

    const student = data;

    const fullName = `${student.firstName} ${student.lastName}`;

    return (
        <>
            <Head>
                <title>{`${fullName} | CareerHub 🇺🇦`}</title>
                <meta name="description" content="Student profile" />
            </Head>

            <div className="bg-white pt-8 shadow-md rounded-2xl container mx-auto">
                <div className="grid grid-cols-[1fr_0.5fr] grid-rows-[minmax(0,_1fr)_auto] gap-4">
                    <section className="px-4 col-span-2 md:col-auto">
                        <div className="grid grid-cols-[auto_1fr] gap-8">
                            <div>
                                <StudentAvatar photoId={student.photo} />
                                {isSelf && (
                                    <Link
                                        href="/me/edit"
                                        className="p- mt-4 text-sm block tracking-wider w-full text-center btn-primary"
                                    >
                                        Редагувати
                                    </Link>
                                )}
                            </div>
                            <div>
                                <StudentInfo
                                    fullName={fullName}
                                    email={student.email}
                                    group={student.studentGroup.name}
                                    phone={student.phone}
                                    birthDate={student.birthDate}
                                />
                            </div>
                        </div>
                    </section>
                    <aside className="px-4 col-span-2 md:col-auto">
                        <StudentSubscriptions accountId={student.id} />
                    </aside>
                </div>
                <section className="p-4">
                    <NavigationMenu
                        sections={navigationItems}
                        currentSection={currentSection}
                        onChangeRoute={changeSection}
                    />
                    {currentSection === "experience" ? (
                        <StudentWorkExperience items={[]} editable={isSelf} />
                    ) : currentSection === "jobOffers" ? (
                        <StudentSubscriptionsJobOffers
                            debouncedSearchValue={debouncedJobOfferSearch}
                            search={jobOfferSearch}
                            setSearch={setJobOfferSearch}
                            orderByOptions={jobOfferOrderByOptions}
                            selectedOrderByOption={
                                selectedJobOfferOrderByOption!
                            }
                            setSelectedOrderByOption={
                                setSelectedJobOfferOrderByOption
                            }
                            accountId={student.id}
                            isSelf={isSelf}
                        />
                    ) : currentSection === "companies" ? (
                        <StudentSubscriptionsCompanies
                            debouncedSearchValue={debouncedCompanySearch}
                            search={companySearch}
                            setSearch={setCompanySearch}
                            orderByOptions={companyOrderByOptions}
                            selectedOrderByOption={
                                selectedCompanyOrderByOption!
                            }
                            setSelectedOrderByOption={
                                setSelectedCompanyOrderByOption
                            }
                            accountId={student.id}
                            isSelf={isSelf}
                        />
                    ) : currentSection === "students" ? (
                        <StudentSubscriptionsStudents
                            search={studentSearch}
                            debouncedSearchValue={debouncedStudentSearch}
                            setSearch={setStudentSearch}
                            orderByOptions={studentOrderByOptions}
                            selectedOrderByOption={
                                selectedStudentOrderByOption!
                            }
                            setSelectedOrderByOption={
                                setSelectedStudentOrderByOption
                            }
                            accountId={student.id}
                            isSelf={isSelf}
                        />
                    ) : null}
                </section>
            </div>
        </>
    );
};

StudentProfilePage.getLayout = CommonLayout;

export default StudentProfilePage;

export const getServerSideProps = protectedSsr<{
    isSelf: boolean;
    studentId: string;
}>({
    allowedRoles: ["Student"],
    getProps: async (context) => {
        const studentId = context.query.studentId as string;
        const { accountId } = context.session;
        const isSelf = studentId === accountId;

        return {
            props: {
                isSelf,
                studentId,
            },
        };
    },
});
