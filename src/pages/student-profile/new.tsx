import CommonLayout from "@/components/layout/CommonLayout";
import { protectedSsr } from "@/lib/protected-ssr";
import { type InferGetServerSidePropsType } from "next";
import Head from "next/head";
import ProfileHeader from "@/features/student-profile/components/ProfileHeader";
import StudentProfileInfo from "@/features/student-profile/components/StudentProfileInfo";

const StudentProfilePage: NextPageWithLayout<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = ({
  isSelf,
  studentId,
}) => {
    return (
      <>
        <Head>
          <meta name="description" content="Student profile" />
        </Head>
        <ProfileHeader isSelf={isSelf} studentId={studentId} />

      <div className="mx-auto mt-8 grid max-w-3xl grid-cols-1 gap-6 sm:px-6 lg:max-w-7xl lg:grid-flow-col-dense lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2 lg:col-start-1">
          <StudentProfileInfo />
        </div>
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
        studentId: accountId,
      },
    };
  },
});
