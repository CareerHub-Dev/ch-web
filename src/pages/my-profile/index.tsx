import useShallowRoutes from '@/hooks/useShallowRoutes';
import useStudentQuery from '@/hooks/useStudentQuery';
import SidePanel from '@/components/my-profile/SidePanel';
import StudentProfile from '@/components/my-profile/StudentProfile';
import CVBoard from '@/components/my-profile/CVBoard';
import { GetServerSidePropsContext } from 'next';
import UserRole from '@/models/enums/UserRole';
import SettingsPanel from '@/components/my-profile/SettingsPanel';
import withVerification from '@/lib/with-verification';

import classes from '@/styles/my-dashboard.module.scss';

const MyDashBoardPage = (_props: object) => {
  const { currentSection, changeSection } = useShallowRoutes({
    url: '/my-profile',
    defaultSection: 'overview',
  });
  const studentQuery = useStudentQuery();

  return (
    <div id="dashBoardGridContainer" className={classes.container}>
      <SidePanel onSectionClick={changeSection} />
      <section className={classes.dashboard}>
        {currentSection === 'overview' && (
          <StudentProfile studentQuery={studentQuery} />
        )}
        {currentSection === 'cvs' && <CVBoard />}
        {currentSection === 'settings' && (
          <SettingsPanel studentQuery={studentQuery} />
        )}
      </section>
    </div>
  );
};

export default MyDashBoardPage;

export const getServerSideProps = withVerification(
  (_context: GetServerSidePropsContext) => ({ props: {} }),
  [UserRole.Student]
);
