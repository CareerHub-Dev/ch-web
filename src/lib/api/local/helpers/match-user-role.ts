import UserRole from '@/model/enums/UserRole';

const matchUserRole = (role: string) => {
  const upperCaseRole = role.toUpperCase();
  switch (upperCaseRole) {
    case 'STUDENT':
      return UserRole.Student;
    case 'COMPANY':
      return UserRole.Company;
    case 'ADMIN':
      return UserRole.Admin;
    default:
      return null;
  }
};
export default matchUserRole;
