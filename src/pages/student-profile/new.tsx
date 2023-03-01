import CommonLayout from "@/components/layout/CommonLayout";
import { protectedSsr } from "@/lib/protected-ssr";
import { type InferGetServerSidePropsType } from "next";

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
  //   TODO: Add student profile page
  return null;
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
        studentId: accountId,
      },
    };
  },
});
