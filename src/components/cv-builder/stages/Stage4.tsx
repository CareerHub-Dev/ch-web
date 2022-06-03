import {
  selectIsAssistEnabled,
  selectSkillsAndTechnologies,
  setSkillsAndTechnologies,
} from '@/store/cv-constructor';
import { useSelector } from 'react-redux';
import useReduxStringInput from '../../../hooks/useReduxStringInput';
import AssistantTip from './AssistantTip';
import Card from '@/components/ui/Card';
import FormTextArea from '@/components/ui/form/FormTextArea';

import classes from './Stage.module.scss';

const Stage4: React.FC = () => {
  const skillsAndTechnologies = useReduxStringInput(
    selectSkillsAndTechnologies,
    setSkillsAndTechnologies
  );
  const isAssistEnabled = useSelector(selectIsAssistEnabled);

  return (
    <>
      <Card className={classes.body}>
        <h1 id="stageHeading">Професійні навички та знання:</h1>
        <FormTextArea
          id="skillsAndTechnologies"
          input={skillsAndTechnologies}
          placeholder="Навички та технології"
        />
      </Card>
      {isAssistEnabled && (
        <AssistantTip>
          <p>
            Подумай про те, як твої цілі співвідносяться з твоїми навичками: як
            головне вміння варто вказати те, що найбільше корисно для досягнення
            твоїх цілей. Буде чудово перерахувати мови програмування, які тобі
            відомі, фреймворки, бібліотеки, бази даних, операційні системи.
          </p>
          <br />
          <p>Також може бути корисно вказати:</p>

          <ul>
            <li>Системи контролю версій</li>
            <li>Методології</li>
            <li>Сервіси</li>
            <li>Протоколи</li>
          </ul>
        </AssistantTip>
      )}
    </>
  );
};

export default Stage4;
