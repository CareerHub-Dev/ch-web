import { useRouter } from 'next/router';
import SidePanel from '@/components/my-dashboard/SidePanel';
import StudentProfile from '@/components/my-dashboard/StudentProfile';
import CVBoard from '@/components/my-dashboard/CVBoard';
import classes from '@/styles/my-dashboard.module.scss';

type DummyProps = {
  kuk: string;
};

const MyDashBoardPage = (props: DummyProps) => {
  const router = useRouter();

  const section = router.query.section as string;

  const displayedSectionChangeHandler = (newSection: string) => {
    router.push(newSection);
  };

  return (
    <div id="dashBoardGridContainer" className={classes.container}>
      <SidePanel onSectionClick={displayedSectionChangeHandler} />

      <section className={classes.dashboard}>
        {section === 'profile' && <StudentProfile />}
        {section === 'cvs' && <CVBoard />}
      </section>
    </div>
  );
};

export default MyDashBoardPage;

// export const getServerSideProps = async (
//   context: GetServerSidePropsContext
// ) => {
//   const { query } = context;
//   const { section } = query;
//   const cookies = context.req.cookies;
//   console.log(cookies);

//   // TODO: check if user is logged in
//   if (!cookies.refreshToken) {
//     return {
//       redirect: {
//         destination: '/auth/login',
//         permanent: false,
//       },
//     };
//   }
//   return {
//     props: {
//       kuk: 'mde',
//     },
//   };
// };
