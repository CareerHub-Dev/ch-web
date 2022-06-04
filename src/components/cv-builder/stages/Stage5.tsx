import {
  selectIsAssistEnabled,
  selectLanguages,
  addLanguage,
} from '@/store/cv-constructor';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import useAppDispatch from '@/hooks/useAppDispatch';
import useInput from '@/hooks/useInput';
import { ProficiencyLevel } from '@/models/CV/Language';
import AssistantTip from './AssistantTip';
import AddItemButton from './AddItemButton';
import AddLanguageForm from './AddLanguageForm';
import LanguagesList from './LanguagesList';
import Card from '@/components/ui/Card';
import Modal from '@/components/ui/Modal';

import classes from './Stage.module.scss';

const Stage5: React.FC = () => {
  const addedLanguages = useSelector(selectLanguages);
  const isAssistEnabled = useSelector(selectIsAssistEnabled);
  const [addLanguageModalIsOpen, setAddLanguageModalIsOpen] = useState(false);
  const proficiencyLevelInput = useInput();
  const languageInput = useInput(
    (value) =>
      value.trim() !== '' &&
      !addedLanguages.items.some((x) => x.object.name === value)
  );

  const dispatch = useAppDispatch();

  const addLanguageModalToggleHandler = () => {
    setAddLanguageModalIsOpen((prevState) => !prevState);
  };

  const formSubmissionHandler = (_event: any) => {
    if (!languageInput.isValid || !proficiencyLevelInput.isValid) {
      proficiencyLevelInput.inputBlurHandler();
      languageInput.inputBlurHandler();
      return;
    }
    dispatch(
      addLanguage({
        name: languageInput.value,
        proficiencyLevel: proficiencyLevelInput.value as ProficiencyLevel,
      })
    );
    languageInput.reset();
    proficiencyLevelInput.reset();
    addLanguageModalToggleHandler();
  };

  return (
    <>
      {addLanguageModalIsOpen && (
        <Modal onModalClose={addLanguageModalToggleHandler}>
          <AddLanguageForm
            language={languageInput}
            level={proficiencyLevelInput}
            onSubmit={formSubmissionHandler}
          />
        </Modal>
      )}
      <Card className={classes.body}>
        <h1 id="stageHeading">Іноземні мови:</h1>
        <AddItemButton
          caption="Додати мову"
          onClick={addLanguageModalToggleHandler}
        />
        <LanguagesList defaultText="Мов не додано" />
      </Card>
      {isAssistEnabled && (
        <>
          <AssistantTip>
            <p>Перелічи, які мови ти знаєш і на якому рівні</p>
            <br />
            <p>
              Немає сенсу включати українську або російську , оскільки це й так
              досить очікувано. Важливими є іноземні мови, які будуть корисні в
              роботі
            </p>
          </AssistantTip>
          <AssistantTip type="good-example">
            <p>English - C1</p>
            <p>German - B2</p>
          </AssistantTip>
        </>
      )}
    </>
  );
};

export default Stage5;
