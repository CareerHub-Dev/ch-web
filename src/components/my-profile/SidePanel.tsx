import { useRouter } from 'next/router';

import cn from 'classnames';
import classes from './SidePanel.module.scss';

const dashboardItems = [
  {
    title: 'Мій профіль',
    query: 'overview',
  },
  {
    title: 'Резюме',
    query: 'cvs',
  },
  {
    title: 'Вакансії',
    query: 'favorite-offers',
  },
  {
    title: 'Компанії',
    query: 'favorite-companies',
  },
  {
    title: 'Контакти',
    query: 'contacts',
  },
  {
    title: 'Налаштування',
    query: 'settings',
  },
];

const SidePanel: React.FC<{
  onSectionClick: (newSection: string) => void;
}> = ({ onSectionClick }) => {
  const router = useRouter();

  const currentSection = router.query.section;

  return (
    <div className={classes.panel}>
      <div>
        {dashboardItems.map((item, index) => (
          <button
            key={index}
            className={cn(
              currentSection &&
                currentSection.includes(item.query) &&
                classes.active
            )}
            onClick={() => onSectionClick(item.query)}
          >
            {item.title}
          </button>
        ))}
      </div>
    </div>
  );
};
export default SidePanel;
