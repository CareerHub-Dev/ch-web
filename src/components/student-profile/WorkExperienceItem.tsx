import WorkingExperience from '@/lib/cv/WorkingExperience';
import { getFormattedDate } from '@/lib/date';

const grayText = 'text-md text-darkGray';

const WorkExperienceItem = ({ item }: { item: WorkingExperience }) => {
  const startDate = getFormattedDate(item.startMonth, item.startYear);
  const endDate = item.jobIsCurrent
    ? 'Досі'
    : getFormattedDate(item.endMonth, item.endYear);

  return (
    <li className="m-4 p-4 ">
      <h3 className="text-lg text-darkerBlue">{item.jobTitle}</h3>
      <p className={grayText}>Компанія: {item.company}</p>
      <p className={grayText}>Дата початку: {startDate}</p>
      <p className={grayText}>Дата закінчення: {endDate}</p>
    </li>
  );
};
export default WorkExperienceItem;
