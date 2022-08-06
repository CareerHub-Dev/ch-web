import { useRouter } from 'next/router';
import { useEffect } from 'react';
import useSections from '@/hooks/useSections';
import SidePanel from '@/components/my-profile/SidePanel';
import StudentProfile from '@/components/my-profile/StudentProfile';
import CVBoard from '@/components/my-profile/CVBoard';
import { GetServerSidePropsContext } from 'next';
import UserRole from '@/models/enums/UserRole';
import verifyAuthority from '@/lib/api/local/helpers/verify-authority';
import verifySessionData from '@/lib/api/local/helpers/verify-session-data';
import classes from '@/styles/my-dashboard.module.scss';
import SettingsPanel from '@/components/my-profile/SettingsPanel';

const MyDashBoardPage = (_props: object) => {
  const { currentSection, changeSection } = useSections({
    url: '/my-profile',
    defaultSection: 'overview',
  });

  return (
    <div id="dashBoardGridContainer" className={classes.container}>
      <SidePanel onSectionClick={changeSection} />
      <section className={classes.dashboard}>
        {currentSection === 'overview' && <StudentProfile />}
        {currentSection === 'cvs' && <CVBoard />}
        {currentSection === 'settings' && <SettingsPanel />}
      </section>
    </div>
  );
};

export default MyDashBoardPage;

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  let accessAllowed = false;
  try {
    const sessionData = await verifySessionData(context.req);
    accessAllowed = verifyAuthority(sessionData, [UserRole.Student]);
  } catch {
    accessAllowed = false;
  }
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
