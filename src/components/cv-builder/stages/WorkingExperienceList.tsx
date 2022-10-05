import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { selectWorkingExperience } from '@/context/cv-constructor';
import FormErrorMessage from '@/components/ui/form/FormErrorMessage';
import WorkingExperienceItem from './WorkingExperienceItem';

import classes from './List.module.scss';

const WorkingExperienceList: React.FC<{
  defaultText?: string;
}> = ({ defaultText = 'Нічого нема' }) => {
  const workingExperience = useSelector(selectWorkingExperience);

  const items = useMemo(() => {
    if (workingExperience.items.length === 0) {
      return <p>{defaultText}</p>;
    }
    return workingExperience.items.map((x) => (
      <WorkingExperienceItem key={x.id} item={x} />
    ));
  }, [workingExperience.items, defaultText]);

  return (
    <>
      <ul className={classes.list}>{items}</ul>
      {workingExperience.hasError && (
        <FormErrorMessage message="Додай досвід роботи або вибери опцію 'Немає досвіду'" />
      )}
    </>
  );
};
export default WorkingExperienceList;
