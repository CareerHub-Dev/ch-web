import InfoItem from './InfoItem';
import MailIcon from '../ui/icons/MailIcon';
import GroupIcon from '../ui/icons/GroupIcon';
import PhoneIcon from '../ui/icons/PhoneIcon';
import DateIcon from '../ui/icons/DateIcon';

const StudentInfo = ({
  fullName,
  email,
  group,
  phone,
  birthDate,
}: {
  fullName: string;
  email: string;
  group: string;
  phone?: string;
  birthDate?: string;
}) => {
  return (
    <>
      <h1 className="text-xl mb-4 text-darkerBlue">{fullName}</h1>
      <div className="grid gap-1">
        <InfoItem text={email} icon={MailIcon} />
        <InfoItem text={group} icon={GroupIcon} />
        {phone && <InfoItem text={phone} icon={PhoneIcon} />}
        {birthDate && <InfoItem text={birthDate} icon={DateIcon} />}
      </div>
    </>
  );
};
export default StudentInfo;