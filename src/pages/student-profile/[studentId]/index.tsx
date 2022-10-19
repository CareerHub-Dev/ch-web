import useShallowRoutes from '@/hooks/useShallowRoutes';
import CommonLayout from '@/components/layout/CommonLayout';
import StudentAvatar from '@/components/student-profile/StudentAvatar';
import StudentInfo from '@/components/student-profile/StudentInfo';
import StudentSubscriptions from '@/components/student-profile/StudentSubscriptions';
import StudentWorkExperience from '@/components/student-profile/StudentWorkExperience';
import Link from 'next/link';
import NavigationMenu from '@/components/student-profile/NavigationMenu';
import { getStudent } from '@/lib/api/student';
import protectedSsr from '@/lib/protected-ssr';

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

const StudentProfilePage: NextPageWithLayout<{
  isSelf: boolean;
  studentData: any;
}> = ({ isSelf, studentData }) => {
  const fullName = `${studentData.firstName} ${studentData.lastName}`;
  const { currentSection, changeSection } = useShallowRoutes({
    sections,
    defaultSection: 'experience',
  });

  return (
    <div
      className="mx-auto grid grid-cols-[1fr_0.5fr] grid-rows-[minmax(0,_1fr)_auto] gap-4 bg-white pt-12 shadow-xl rounded-b-lg
        max-w-full
        lg:max-w-4xl"
    >
      <section className="px-4 col-span-2 md:col-auto">
        <div className="flex flex-center">
          <StudentAvatar photoId={studentData.photoId} />
          <div className="ml-4">
            <StudentInfo
              fullName={fullName}
              email={studentData.email}
              group={studentData.studentGroup.name}
              phone={studentData.phone}
              birthDate={studentData.birthDate}
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
        <StudentSubscriptions accountId={studentData.id} />
      </aside>
      <section className="p-4 col-span-2">
        <NavigationMenu
          sections={navigationItems}
          currentSection={currentSection}
          onChangeRoute={changeSection}
        />
        <StudentWorkExperience items={[]} editable={isSelf} />
      </section>
    </div>
  );
};

StudentProfilePage.getLayout = CommonLayout();

export default StudentProfilePage;

export const getServerSideProps = protectedSsr({ allowedRoles: ['Student'] })(
  async (context) => {
    const studentId = context.query.studentId as string;
    const { accountId, jwtToken } = context.session;
    const studentData = await getStudent(studentId)(jwtToken)();

    const isSelf = studentId === accountId;
    return {
      props: {
        isSelf,
        studentData,
      },
    };
  }
);
