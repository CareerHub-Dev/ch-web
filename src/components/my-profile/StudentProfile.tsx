import useStudentQuery from '@/hooks/useStudentData';
import Card from '../ui/Card';
import LoadingSpinner from '../ui/LoadingSpinner';
import StudentAvatar from './StudentAvatar';
import InfoSpan from './InfoSpan';
import GroupIcon from '../ui/icons/GroupIcon';
import MailIcon from '../ui/icons/MailIcon';
import DateIcon from '../ui/icons/DateIcon';
import PhoneIcon from '../ui/icons/PhoneIcon';
import classes from './StudentProfile.module.scss';

const StudentProfile: React.FC<{
  studentQuery: ReturnType<typeof useStudentQuery>;
}> = ({ studentQuery }) => {
  if (studentQuery.isLoading) {
    return <LoadingSpinner />;
  }
  if (studentQuery.isError) {
    return <div>Помилка звернення до серверу</div>;
  }

  const profileData = studentQuery.data;
  const displayedName = `${profileData.firstName} ${profileData.lastName}`;
  const avatarPhotoId = profileData.photo;
  const groupName = profileData.studentGroup?.name || 'Групу не вказано';
  const birthDate = profileData.birthDate;
  const birthDateIsSet = !!birthDate;
  const phone = profileData.phone;
  const phoneIsSet = !!phone;

  return (
    <section className={classes.wrapper}>
      <div id="generalInfo">
        <h1 className={classes.name}>{displayedName}</h1>
        <Card className={classes.card}>
          <InfoSpan text={profileData.email} icon={MailIcon} />
          <InfoSpan text={groupName} icon={GroupIcon} />
          {birthDateIsSet && <InfoSpan text={birthDate} icon={DateIcon} />}
          {phoneIsSet && <InfoSpan text={phone} icon={PhoneIcon} />}
        </Card>
      </div>
      <StudentAvatar photoId={avatarPhotoId} />
    </section>
  );
};
export default StudentProfile;
