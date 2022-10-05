import {
  selectIsAssistEnabled,
  selectJobType,
  selectName,
  selectSurname,
  setName,
  setSurname,
} from '@/context/cv-constructor';
import { useSelector } from 'react-redux';
import useStudentQuery from '@/hooks/useStudentQuery';
import useReduxStringInput from '@/hooks/useReduxStringInput';
import AssistantTip from './AssistantTip';
import Card from '@/components/ui/Card';
import FormInput from '@/components/ui/form/FormInput';
import LoadingSpinner from '@/components/ui/LoadingSpinner';

import classes from './Stage.module.scss';

const Stage1 = () => {
  const name = useReduxStringInput(selectName, setName);
  const surname = useReduxStringInput(selectSurname, setSurname);
  const isAssistEnabled = useSelector(selectIsAssistEnabled);
  const selectedJobType = useSelector(selectJobType);
  const { isLoading: studentDataIsLoading } = useStudentQuery({
    onSuccess: (data) => {
      if (data?.firstName) {
        name.force(data?.firstName);
      }
      if (data?.lastName) {
        surname.force(data?.lastName);
      }
    },
  });
  if (studentDataIsLoading) {
    return (
      <div className="g__center">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <Card className={classes.body}>
      <h1>Загальна інформація:</h1>
      {isAssistEnabled && ['dev', 'qa'].includes(selectedJobType.value) && (
        <AssistantTip>
          <p>
            В ІТ-сфері всюди використовується англійська, тому краще заповнювати
            резюме на ньому. Давай почнемо з імені та прізвища
          </p>
        </AssistantTip>
      )}
      <FormInput id="name" label="Ім'я" input={name} />
      <FormInput id="surname" label="Прізвище" input={surname} />
    </Card>
  );
};

export default Stage1;
