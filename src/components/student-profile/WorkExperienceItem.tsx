import WorkingExperience from '@/models/CV/WorkingExperience';
import { getFormattedDate } from '@/lib/date';

const greyText = 'text-md text-darkerGrey';

const WorkExperienceItem = ({ item }: { item: WorkingExperience }) => {
  const startDate = getFormattedDate(item.startMonth, item.startYear);
  const endDate = item.jobIsCurrent
    ? 'Досі'
    : getFormattedDate(item.endMonth, item.endYear);

  return (
    <li className="m-4 p-4 ">
      <h3 className="text-lg text-darkerBlue">{item.jobTitle}</h3>
      <p className={greyText}>Компанія: {item.company}</p>
      <p className={greyText}>Дата початку: {startDate}</p>
      <p className={greyText}>Дата закінчення: {endDate}</p>
    </li>
  );
};
export default WorkExperienceItem;
