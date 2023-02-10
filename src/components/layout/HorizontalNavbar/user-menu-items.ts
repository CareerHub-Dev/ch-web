import { type UserRole } from '@/lib/schemas/UserRole';
import {
  Cog6ToothIcon,
  DocumentIcon,
  UserCircleIcon,
  ChartBarSquareIcon,
  BriefcaseIcon,
} from '@heroicons/react/24/outline';

export function getUserMenuLinks(role: UserRole) {
  switch (role) {
    case 'Student':
      return [
        {
          label: 'Мій профіль',
          Icon: UserCircleIcon,
          href: '/my-profile',
        },
        {
          label: 'Мої резюме',
          Icon: DocumentIcon,
          href: '/my-cvs',
        },
        {
          label: 'Налаштування',
          Icon: Cog6ToothIcon,
          href: '/my-profile/edit',
        },
      ];
    case 'Company':
      return [
        { label: 'Дошка', Icon: ChartBarSquareIcon, href: 'dashboard' },
        { label: 'Вакансії', Icon: BriefcaseIcon, href: 'job-offers' },
        { label: 'Налаштування', Icon: Cog6ToothIcon, href: 'account-details' },
      ];
    default:
      return [];
  }
}
