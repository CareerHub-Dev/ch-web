import CommonLayout from '@/components/layout/CommonLayout';
import StudentAvatar from '@/components/student-profile/StudentAvatar';
import StudentInfo from '@/components/student-profile/StudentInfo';
import StudentSubscriptions from '@/components/student-profile/StudentSubscriptions';
import StudentWorkExperience from '@/components/student-profile/StudentWorkExperience';
import Link from 'next/link';
import { getStudent } from '@/lib/api/student';
import protectedSsr from '@/lib/protected-ssr';


const StudentProfilePage: NextPageWithLayout<{
  isSelf: boolean;
  studentData: any;
}> = ({ isSelf, studentData }) => {
  const fullName = `${studentData.firstName} ${studentData.lastName}`;

  return (
    <div
      className="mx-auto grid grid-cols-[1fr_0.5fr] grid-rows-[minmax(0,_1fr)_auto] bg-white pt-12 shadow-xl rounded-b-lg
        max-w-full
        lg:max-w-4xl"
    >
      <section className="px-4">
        <div className="flex flex-center">
          <StudentAvatar />
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
            <a
              className="cursor-pointer p-2 mt-4 text-sm bg-darkerBlue text-white border-2 block
                border-darkerBlue border-solid rounded-xl font-semibold w-[128px] text-center
                hover:shadow-lg hover:bg-white hover:text-darkerBlue ease-in-out duration-300"
            >
              {'Редагувати'}
            </a>
          </Link>
        )}
      </section>
      <aside className="px-4">
        <StudentSubscriptions accountId={studentData.id} />
      </aside>

      <section className="p-4 col-span-2">
        <hr className="m-4" />
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
