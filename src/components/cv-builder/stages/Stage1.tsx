import {
  selectIsAssistEnabled,
  selectJobType,
  selectName,
  selectSurname,
  setName,
  setSurname,
} from '@/store/cv-constructor';
import { useSelector } from 'react-redux';
import useReduxStringInput from '@/hooks/useReduxStringInput';
import AssistantTip from './AssistantTip';
import Card from '@/components/ui/Card';
import FormInput from '@/components/ui/form/FormInput';

import classes from './Stage.module.scss';

const Stage1: React.FC = () => {
  const name = useReduxStringInput(selectName, setName);
  const surname = useReduxStringInput(selectSurname, setSurname);
  const isAssistEnabled = useSelector(selectIsAssistEnabled);
  const selectedJobType = useSelector(selectJobType);

  return (
    <>
      <Card className={classes.body}>
        <h1>Загальна інформація:</h1>
        {isAssistEnabled && ['dev', 'qa'].includes(selectedJobType.value) && (
          <AssistantTip>
            <p>
              В ІТ-сфері всюди використовується англійська, тому краще
              заповнювати резюме на ньому. Давай почнемо з імені та прізвища
            </p>
          </AssistantTip>
        )}
        <FormInput id="name" label="Ім'я" input={name} />
        <FormInput id="surname" label="Прізвище" input={surname} />
      </Card>
    </>
  );
};

export default Stage1;
