import useShallowRoutes from '@/hooks/useShallowRoutes';
import useStudentQuery from '@/hooks/useStudentQuery';
import SidePanel from '@/components/my-profile/SidePanel';
import StudentProfile from '@/components/my-profile/StudentProfile';
import CVBoard from '@/components/my-profile/CVBoard';
import SettingsPanel from '@/components/my-profile/SettingsPanel';
import { getStudent } from '@/lib/api/student';
import protectedSsr from '@/lib/protected-ssr';

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

export const getServerSideProps = protectedSsr({ allowedRoles: ['Student'] })(
  async (context) => {
    const storedCookie = context.req.cookies['ch-http']!;
    const { accountId, accessToken } = JSON.parse(storedCookie);
    const studentData = await getStudent(accountId)(accessToken)();
    return {
      props: studentData,
    };
  }
);
