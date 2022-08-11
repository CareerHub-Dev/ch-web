import useSections from '@/hooks/useSections';
import SidePanel from '@/components/my-profile/SidePanel';
import StudentProfile from '@/components/my-profile/StudentProfile';
import CVBoard from '@/components/my-profile/CVBoard';
import { GetServerSidePropsContext } from 'next';
import UserRole from '@/models/enums/UserRole';
import SettingsPanel from '@/components/my-profile/SettingsPanel';
import withVerification from '@/lib/with-verification';

import classes from '@/styles/my-dashboard.module.scss';

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

export const getServerSideProps = withVerification(
  (_context: GetServerSidePropsContext) => ({ props: {} }),
  [UserRole.Student]
);
