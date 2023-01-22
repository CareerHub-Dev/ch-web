import type { UserRole } from './schemas/UserRole';

const studentNavLinks: AppNavigationLink[] = [
  {
    text: 'Компанії',
    href: '/companies',
    exact: true,
  },
  {
    text: 'Вакансії',
    href: '/job-offers',
    exact: true,
  },
];

const defaultNavLinks: AppNavigationLink[] = [];

export default function getNavigationLinks(userRole?: UserRole) {
  if (userRole === 'Student') {
    return studentNavLinks;
  }
  return defaultNavLinks;
}
