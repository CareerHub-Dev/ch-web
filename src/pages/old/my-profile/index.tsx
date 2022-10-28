import useShallowRoutes from '@/hooks/useShallowRoutes';
import useStudentQuery from '@/hooks/useStudentQuery';
import SidePanel from '@/components/my-profile/SidePanel';
import StudentProfile from '@/components/my-profile/StudentProfile';
import CVBoard from '@/components/my-profile/CVBoard';
import SettingsPanel from '@/components/my-profile/SettingsPanel';
import { getStudent } from '@/lib/api/student';
import { protectedSsr } from '@/lib/protected-ssr';

import classes from '@/styles/my-dashboard.module.scss';

const StudentProfilePage = ({ studentData }: { studentData: any }) => {
  // const { currentSection, changeSection } = useShallowRoutes({
  //   defaultSection: 'overview',
  // });
  // const studentQuery = useStudentQuery({ initialData: studentData });

  // return (
  //   <div id="dashBoardGridContainer" className={classes.container}>
  //     <SidePanel onSectionClick={changeSection} />
  //     <section className={classes.dashboard}>
  //       {currentSection === 'overview' && (
  //         <StudentProfile studentQuery={studentQuery} />
  //       )}
  //       {currentSection === 'cvs' && <CVBoard />}
  //       {currentSection === 'settings' && (
  //         <SettingsPanel studentQuery={studentQuery} />
  //       )}
  //     </section>
  //   </div>
  // );
};

export default StudentProfilePage;

