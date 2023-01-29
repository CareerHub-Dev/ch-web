import CommonLayout from '@/components/layout/CommonLayout';
import NavigationMenu from '@/components/student-profile/NavigationMenu';
import StudentAvatar from '@/components/student-profile/StudentAvatar';
import StudentInfo from '@/components/student-profile/StudentInfo';
import StudentSubscriptions from '@/components/student-profile/StudentSubscriptions';
import StudentSubscriptionsCompanies from '@/components/student-profile/StudentSubscriptionsCompanies';
import StudentSubscriptionsJobOffers from '@/components/student-profile/StudentSubscriptionsJobOffers';
import StudentSubscriptionsStudents from '@/components/student-profile/StudentSubscriptionsStudents';
import StudentWorkExperience from '@/components/student-profile/StudentWorkExperience';
import useShallowRoutes from '@/hooks/useShallowRoutes';
import { getStudent } from '@/lib/api/student';
import axiosMiddleware from '@/lib/middleware/axiosMiddleware';
import { protectedSsr } from '@/lib/protected-ssr';
import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';
import { useDebounce } from 'usehooks-ts';

import { type Student } from '@/lib/schemas/Student';
import { type InferGetServerSidePropsType } from 'next';

const navigationItems = [
  {
    title: 'Досвід роботи',
    section: 'experience',
  },
  {
    title: 'Вакансії',
    section: 'jobOffers',
  },
  {
    title: 'Компанії',
    section: 'companies',
  },
  {
    title: 'Студенти',
    section: 'students',
  },
  {
    title: 'Підписники',
    section: 'subscribers',
  },
];

const sections = ['experience', 'jobOffers', 'companies', 'students'];

const defaultOrderByOption = {
  label: 'За замовченням',
  value: '',
};

const studentOrderByOptions = [
  defaultOrderByOption,
  {
    label: "За ім'ям",
    value: 'firstName',
  },
  {
    label: 'За прізвищем',
    value: 'lastName',
  },
  {
    label: 'За групою',
    value: 'studentGroup.name',
  },
];

const companyOrderByOptions = [
  defaultOrderByOption,
  {
    label: 'За назвою',
    value: 'name',
  },
  {
    label: 'За назвою зворотньо',
    value: 'name DESC',
  },
];

const jobOfferOrderByOptions = [
  defaultOrderByOption,
  {
    label: 'За назвою',
    value: 'title',
  },
];

const StudentProfilePage: NextPageWithLayout<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = ({ isSelf, student }) => {
  const fullName = `${student.firstName} ${student.lastName}`;
  const { currentSection, changeSection } = useShallowRoutes({
    sections,
    defaultSection: 'experience',
  });
  const [studentSearch, setStudentSearch] = useState('');
  const [selectedStudentOrderByOption, setSelectedStudentOrderByOption] =
    useState(studentOrderByOptions.at(0));
  const debouncedStudentSearch = useDebounce(studentSearch, 500);
  const [companySearch, setCompanySearch] = useState('');
  const [selectedCompanyOrderByOption, setSelectedCompanyOrderByOption] =
    useState(companyOrderByOptions.at(0));
  const debouncedCompanySearch = useDebounce(companySearch, 500);
  const [jobOfferSearch, setJobOfferSearch] = useState('');
  const [selectedJobOfferOrderByOption, setSelectedJobOfferOrderByOption] =
    useState(jobOfferOrderByOptions.at(0));
  const debouncedJobOfferSearch = useDebounce(jobOfferSearch, 500);

  return (
    <>
      <Head>
        <title>{`${fullName} | CareerHub 🇺🇦`}</title>
        <meta name="description" content="Student profile" />
      </Head>

      <div className="mx-auto bg-white pt-12 shadow-md rounded-b-lg mb-20 max-w-full lg:max-w-4xl">
        <div className="grid grid-cols-[1fr_0.5fr] grid-rows-[minmax(0,_1fr)_auto] gap-4">
          <section className="px-4 col-span-2 md:col-auto">
            <div className="grid grid-cols-[auto_1fr] gap-8">
              <div>
                <StudentAvatar photoId={student.photo} />
                {isSelf && (
                  <Link
                    href="/my-profile/edit"
                    className="p-2 mt-4 text-sm block tracking-wider w-full text-center btn-primary"
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
          {currentSection === 'experience' ? (
            <StudentWorkExperience items={[]} editable={isSelf} />
          ) : currentSection === 'jobOffers' ? (
            <StudentSubscriptionsJobOffers
              debouncedSearchValue={debouncedJobOfferSearch}
              search={jobOfferSearch}
              setSearch={setJobOfferSearch}
              orderByOptions={jobOfferOrderByOptions}
              selectedOrderByOption={selectedJobOfferOrderByOption!}
              setSelectedOrderByOption={setSelectedJobOfferOrderByOption}
              accountId={student.id}
              isSelf={isSelf}
            />
          ) : currentSection === 'companies' ? (
            <StudentSubscriptionsCompanies
              debouncedSearchValue={debouncedCompanySearch}
              search={companySearch}
              setSearch={setCompanySearch}
              orderByOptions={companyOrderByOptions}
              selectedOrderByOption={selectedCompanyOrderByOption!}
              setSelectedOrderByOption={setSelectedCompanyOrderByOption}
              accountId={student.id}
              isSelf={isSelf}
            />
          ) : currentSection === 'students' ? (
            <StudentSubscriptionsStudents
              search={studentSearch}
              debouncedSearchValue={debouncedStudentSearch}
              setSearch={setStudentSearch}
              orderByOptions={studentOrderByOptions}
              selectedOrderByOption={selectedStudentOrderByOption!}
              setSelectedOrderByOption={setSelectedStudentOrderByOption}
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
  student: Student;
  isSelf: boolean;
}>({
  allowedRoles: ['Student'],
  getProps: async (context) => {
    const studentId = context.query.studentId as string;
    const { accountId } = context.session;
    const isSelf = studentId === accountId;

    try {
      const student = await getStudent(studentId)(axiosMiddleware(context));
      return {
        props: {
          isSelf,
          student,
        },
      };
    } catch (error) {
      return { notFound: true };
    }
  },
});
