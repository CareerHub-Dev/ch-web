import type { UserRole } from './schemas/UserRole';

const studentNavLinks: AppNavigationLink[] = [
  {
    text: 'Мої резюме',
    href: '/my-cvs',
    exact: true,
  },
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

const defaultNavLinks: AppNavigationLink[] = [
  {
    text: 'Увійти',
    href: '/auth/login',
  },
];

export default function getNavigationLinks(userRole?: UserRole) {
  if (userRole === 'Student') {
    return studentNavLinks;
  }
  return defaultNavLinks;
}