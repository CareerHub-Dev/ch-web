import useShallowRoutes from '@/hooks/useShallowRoutes';
import useStudentQuery from '@/hooks/useStudentQuery';
import SidePanel from '@/components/my-profile/SidePanel';
import StudentProfile from '@/components/my-profile/StudentProfile';
import CVBoard from '@/components/my-profile/CVBoard';
import { GetServerSidePropsContext } from 'next';
import UserRole from '@/models/enums/UserRole';
import SettingsPanel from '@/components/my-profile/SettingsPanel';
import { fetchStudent } from '@/lib/api/remote/student';
import protectedServerSideProps from '@/lib/protected-server-side-props';

import classes from '@/styles/my-dashboard.module.scss';

const StudentProfilePage = ({ studentData }: { studentData: any }) => {
  const { currentSection, changeSection } = useShallowRoutes({
    url: '/my-profile',
    defaultSection: 'overview',
  });
  const studentQuery = useStudentQuery({ initialData: studentData });

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

export default StudentProfilePage;

export const getServerSideProps = protectedServerSideProps(
  [UserRole.Student],
  async (_context: GetServerSidePropsContext) => {
    const storedCookie = _context.req.cookies['ch-http']!;
    const { accountId, accessToken } = JSON.parse(storedCookie);
    const studentData = await fetchStudent({ accountId, accessToken })();
    return {
      studentData,
    };
  }
);
