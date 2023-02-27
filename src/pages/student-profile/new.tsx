import CommonLayout from "@/components/layout/CommonLayout";
import CenteredLoadingSpinner from "@/components/ui/CenteredLoadingSpinner";
import { useProtectedQuery } from "@/hooks/useProtectedQuery";
import { getStudent } from "@/lib/api/student";
import { useRouter } from "next/router";
import { protectedSsr } from "@/lib/protected-ssr";
import Head from "next/head";
import StudentProfileSkeleton from "@/features/student-profile/StudentProfileSkeleton";

const StudentProfilePage: NextPageWithLayout<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = () => {
  // const router = useRouter();
  // const { data, isLoading } = useProtectedQuery(
  //   ["student", studentId],
  //   getStudent(studentId),
  //   {
  //     onError: () => {
  //       console.error("Error fetching student");
  //     }
  //   }
  // );
  // if (isLoading)
  //   return (
  //     <>
  //       <Head>
  //         <meta name="description" content="Student profile" />
  //       </Head>
  //       <CenteredLoadingSpinner />
  //     </>
  //   );
  return <StudentProfileSkeleton />;
};

StudentProfilePage.getLayout = CommonLayout;

export default StudentProfilePage;

export const getServerSideProps = protectedSsr<{
  isSelf: boolean;
}>({
  allowedRoles: ["Student"],
  getProps: async (context) => {
    const studentId = context.query.studentId as string;
    const { accountId } = context.session;
    const isSelf = studentId === accountId;

    return {
      props: {
        isSelf,
      },
    };
  },
});
