import { useRouter } from 'next/router';
import { useEffect } from 'react';
import SidePanel from '@/components/my-profile/SidePanel';
import StudentProfile from '@/components/my-profile/StudentProfile';
import CVBoard from '@/components/my-profile/CVBoard';
import { GetServerSidePropsContext } from 'next';
import UserRole from '@/models/enums/UserRole';
import verifyAuthority from '@/lib/api/local/helpers/verify-authority';
import verifySessionData from '@/lib/api/local/helpers/verify-session-data';
import classes from '@/styles/my-dashboard.module.scss';

const MyDashBoardPage = (_props: object) => {
  const router = useRouter();
  const section = router.query.section as string;
  useEffect(() => {
    console.log('useEffect 1');
    if (!section || section.length === 0) {
      router.push('/my-profile/?section=overview', undefined, {
        shallow: true,
      });
    }
  }, [router, section]);

  const displayedSectionChangeHandler = (newSection: string) => {
    router.push(`/my-profile/?section=${newSection}`, undefined, {
      shallow: true,
    });
  };

  return (
    <div id="dashBoardGridContainer" className={classes.container}>
      <SidePanel onSectionClick={displayedSectionChangeHandler} />

      <section className={classes.dashboard}>
        {section === 'overview' && <StudentProfile />}
        {section === 'cvs' && <CVBoard />}
      </section>
    </div>
  );
};

export default MyDashBoardPage;

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const sessionData = await verifySessionData(context.req);
  const accessAllowed = verifyAuthority(sessionData, [UserRole.Student]);

  if (!accessAllowed) {
    return {
      redirect: {
        destination: '/404',
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};
