import {
  selectIsAssistEnabled,
  selectGoals,
  setGoals,
} from '@/context/cv-constructor';
import { useSelector } from 'react-redux';
import useReduxStringInput from '@/hooks/useReduxStringInput';
import AssistantTip from './AssistantTip';
import Card from '@/components/ui/Card';
import FormTextArea from '@/components/ui/form/FormTextArea';

import classes from './Stage.module.scss';

const Stage3 = () => {
  const goals = useReduxStringInput(selectGoals, setGoals);
  const isAssistEnabled = useSelector(selectIsAssistEnabled);

  return (
    <>
      <Card className={classes.body}>
        <h1 id="stageHeading">Опишіть свої цілі:</h1>
        <FormTextArea
          id="goals"
          input={goals}
          placeholder="Введіть не більше 200 символів..."
          errorMessage="Поле не заповнене або перевищує ліміт 200 символів "
        />
      </Card>
      {isAssistEnabled && (
        <>
          <AssistantTip>
            <p>
              Цілі - це те, чим саме ти хочеш займатися на роботі, чого ти хочеш
              досягти, з якими людьми працювати і в якій компанії
            </p>
          </AssistantTip>
          <AssistantTip type="good-example">
            <p>
              Seeking a position as a Javascript trainee, to leverage my skills
              and passion for learning to make interesting and useful projects
              in a team of professionals.
            </p>
          </AssistantTip>
          <AssistantTip type="bad-example">
            <p>
              Хочу бути розробником, знайомий з безліччю технологій у сфері IT.
            </p>
          </AssistantTip>
        </>
      )}
    </>
  );
};

export default Stage3;
