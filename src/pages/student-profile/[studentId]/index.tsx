import type { NextPageWithLayout } from '../../_app';
import Footer from '@/components/layout/Footer';
import StudentAvatar from '@/components/student-profile/StudentAvatar';
import StudentInfo from '@/components/student-profile/StudentInfo';
import dynamic from 'next/dynamic';
import StudentWorkExperience from '@/components/student-profile/StudentWorkExperience';
import { fetchStudent } from '@/lib/api/remote/student';
import protectedServerSideProps from '@/lib/protected-server-side-props';
import UserRole from '@/models/enums/UserRole';
import { GetServerSidePropsContext } from 'next';
import Link from 'next/link';

const StudentSubscriptions = dynamic(
  import('@/components/student-profile/StudentSubscriptions'),
  { ssr: false }
);

const StudentProfilePage: NextPageWithLayout<{
  isSelf: boolean;
  studentData: any;
}> = ({ isSelf, studentData }) => {
  const fullName = `${studentData.firstName} ${studentData.lastName}`;

  return (
    <div
      className="mx-auto grid grid-cols-[1fr_0.5fr] grid-rows-[minmax(0,_1fr)_auto] bg-white pt-12 shadow-2xl rounded-b-lg
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
        <StudentWorkExperience items={[]} />
      </section>
    </div>
  );
};

StudentProfilePage.getLayout = (page) => {
  return (
    <>
      <main className="bg-lightBlue h-screen">{page}</main>;
      <Footer />
    </>
  );
};

export default StudentProfilePage;

export const getServerSideProps = protectedServerSideProps(
  [UserRole.Student],
  async (context: GetServerSidePropsContext) => {
    const studentId = context.query.studentId as string;
    const storedCookie = context.req.cookies['ch-http'] as string;
    console.log(storedCookie);

    const { accountId, accessToken } = JSON.parse(storedCookie);
    const studentData = await fetchStudent({
      accountId: studentId,
      accessToken,
    })();

    const isSelf = studentId === accountId;
    return {
      isSelf,
      studentData,
    };
  }
);
