import { type UseStudentQueryResult } from '@/hooks/useStudentQuery';
import AvatarEdit from './AvatarEdit';
import GeneralInfoEdit from './GeneralInfoEdit';

const SettingsPanel: React.FC<{
  studentQuery: UseStudentQueryResult;
}> = ({ studentQuery }) => {
  const studentData = studentQuery.data;
  const generalInfo = {
    firstName: studentData?.firstName || '',
    lastName: studentData?.lastName || '',
    phoneNumber: studentData?.phoneNumber || '',
    birthDate: studentData?.birthDate || '',
  };

  return (
    <div className="mx-32">
      <GeneralInfoEdit initialData={generalInfo} />
      <AvatarEdit currentAvatar={'/default-avatar.png'} />
    </div>
  );
};
export default SettingsPanel;
