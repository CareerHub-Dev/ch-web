import { useRouter } from 'next/router';
import { useEffect } from 'react';
import SidePanel from '@/components/my-dashboard/SidePanel';
import StudentProfile from '@/components/my-dashboard/StudentProfile';
import CVBoard from '@/components/my-dashboard/CVBoard';
import { GetServerSidePropsContext } from 'next';
import UserRole from '@/model/enums/UserRole';
import verifyAuthority from '@/lib/api/local/helpers/verify-authority';
import classes from '@/styles/my-dashboard.module.scss';

const MyDashBoardPage = () => {
  const router = useRouter();
  const section = router.query.section as string;
  useEffect(() => {
    if (!section || section.length === 0) {
      router.push('/my-profile/?section=overview', undefined, {
        shallow: true,
      });
    }
  }, [section, router]);

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
  const accessAllowed = await verifyAuthority(context.req, [UserRole.Student]);

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
