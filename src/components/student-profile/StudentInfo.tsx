import InfoItem from './InfoItem';
import {
  EnvelopeIcon,
  UserGroupIcon,
  CalendarIcon,
  PhoneIcon,
} from '@heroicons/react/24/outline';

import format from 'date-fns/format';

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
  phone: string | null;
  birthDate: string | null;
}) => {
  const formattedBirthDate = birthDate
    ? format(new Date(birthDate), 'dd.MM.yyyy')
    : '';

  return (
    <>
      <h1 className="text-xl mb-4 text-darkerBlue">{fullName}</h1>
      <div className="grid gap-1">
        <InfoItem text={email} icon={() => <EnvelopeIcon title="Пошта" />} />
        <InfoItem text={group} icon={() => <UserGroupIcon title="Група" />} />
        {phone && (
          <InfoItem
            text={phone}
            icon={() => <PhoneIcon title="Номер телефону" />}
          />
        )}
        {birthDate && (
          <InfoItem
            text={formattedBirthDate}
            icon={() => <CalendarIcon title="Дата народження" />}
          />
        )}
      </div>
    </>
  );
};
export default StudentInfo;
