import { useSelector } from 'react-redux';
import { selectEducation } from '../../../context/cv-constructor';
import EducationItem from './EducationItem';
import FormErrorMessage from '@/components/ui/form/FormErrorMessage';

import cn from 'classnames';
import classes from './List.module.scss';

const EducationList: React.FC<{
  defaultText?: string;
}> = ({ defaultText = 'Нічого нема' }) => {
  const education = useSelector(selectEducation);

  return (
    <>
      <ul
        className={cn(
          classes.list,
          education.hasError && classes['invalid-list']
        )}
      >
        {education.items.length === 0 ? (
          <p>{defaultText}</p>
        ) : (
          education.items.map((x) => <EducationItem key={x.id} item={x} />)
        )}
      </ul>
      {education.hasError && <FormErrorMessage message="Додайте хоча б одну" />}
    </>
  );
};

export default EducationList;
