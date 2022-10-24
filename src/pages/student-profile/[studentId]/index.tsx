import useShallowRoutes from '@/hooks/useShallowRoutes';
import CommonLayout from '@/components/layout/CommonLayout';
import StudentAvatar from '@/components/student-profile/StudentAvatar';
import StudentInfo from '@/components/student-profile/StudentInfo';
import StudentSubscriptions from '@/components/student-profile/StudentSubscriptions';

import StudentWorkExperience from '@/components/student-profile/StudentWorkExperience';
import StudentSubscriptionsJobOffers from '@/components/student-profile/StudentSubscriptionsJobOffers';
import StudentSubscriptionsCompanies from '@/components/student-profile/StudentSubscriptionsCompanies';
import StudentSubscriptionsStudents from '@/components/student-profile/StudentSubscriptionsStudents';

import Link from 'next/link';
import NavigationMenu from '@/components/student-profile/NavigationMenu';
import { type Student } from '@/lib/schemas/Student';
import { type InferGetServerSidePropsType } from 'next';
import { getStudent } from '@/lib/api/student';
import { protectedSsr } from '@/lib/protected-ssr';

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
];

const sections = ['experience', 'jobOffers', 'companies', 'students'];

const StudentProfilePage: NextPageWithLayout<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = ({ isSelf, student }) => {
  const fullName = `${student.firstName} ${student.lastName}`;
  const { currentSection, changeSection } = useShallowRoutes({
    sections,
    defaultSection: 'experience',
  });

  return (
    <div
      className="mx-auto grid grid-cols-[1fr_0.5fr] grid-rows-[minmax(0,_1fr)_auto] gap-4 bg-white pt-12 shadow-xl rounded-b-lg
        mb-20  
        max-w-full
        lg:max-w-4xl"
    >
      <section className="px-4 col-span-2 md:col-auto">
        <div className="flex flex-center">
          <StudentAvatar photoId={student.photo} />
          <div className="ml-4">
            <StudentInfo
              fullName={fullName}
              email={student.email}
              group={student.studentGroup.name}
              phone={student.phone}
              birthDate={student.birthDate}
            />
          </div>
        </div>
        {isSelf && (
          <Link href={`/my-profile/edit`}>
            <a className="p-2 mt-4 text-sm block tracking-wider font-semibold w-[128px] text-center btn-primary">
              {'Редагувати'}
            </a>
          </Link>
        )}
      </section>
      <aside className="px-4 col-span-2 md:col-auto">
        <StudentSubscriptions accountId={student.id} />
      </aside>
      <section className="p-4 col-span-2">
        <NavigationMenu
          sections={navigationItems}
          currentSection={currentSection}
          onChangeRoute={changeSection}
        />
        {currentSection === 'experience' ? (
          <StudentWorkExperience items={[]} editable={isSelf} />
        ) : currentSection === 'jobOffers' ? (
          <StudentSubscriptionsJobOffers
            accountId={student.id}
            isSelf={isSelf}
          />
        ) : currentSection === 'companies' ? (
          <StudentSubscriptionsCompanies
            accountId={student.id}
            isSelf={isSelf}
          />
        ) : currentSection === 'students' ? (
          <StudentSubscriptionsStudents
            accountId={student.id}
            isSelf={isSelf}
          />
        ) : null}
      </section>
    </div>
  );
};

StudentProfilePage.getLayout = CommonLayout();

export default StudentProfilePage;

export const getServerSideProps = protectedSsr<{
  student: Student;
  isSelf: boolean;
}>({
  allowedRoles: ['Student'],
  getProps: async (context) => {
    const studentId = context.query.studentId as string;
    const { accountId, jwtToken } = context.session;

    try {
      const student = await getStudent(studentId)(jwtToken);
      const isSelf = studentId === accountId;
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
