import { type UserRole } from '@/lib/schemas/UserRole';
import {
  Cog6ToothIcon,
  DocumentIcon,
  UserCircleIcon,
  ChartBarSquareIcon,
  BriefcaseIcon,
} from '@heroicons/react/24/outline';

export function getUserMenuLinks(role?: UserRole) {
  switch (role) {
    case 'Student':
      return [
        {
          text: 'Мій профіль',
          Icon: UserCircleIcon,
          href: '/me',
        },
        {
          text: 'Мої резюме',
          Icon: DocumentIcon,
          href: '/my-cvs',
        },
        {
          text: 'Налаштування',
          Icon: Cog6ToothIcon,
          href: '/me/edit',
        },
      ];
    case 'Company':
      return [
        { text: 'Дошка', Icon: ChartBarSquareIcon, href: 'dashboard' },
        { text: 'Вакансії', Icon: BriefcaseIcon, href: 'job-offers' },
        { text: 'Налаштування', Icon: Cog6ToothIcon, href: 'account-details' },
      ];
    default:
      return [];
  }
}

export function getNavigationLinks(role?: UserRole) {
  switch (role) {
    case 'Student':
      return [
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
    default:
      return [];
  }
}
