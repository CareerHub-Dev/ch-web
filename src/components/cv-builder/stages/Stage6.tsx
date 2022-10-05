import {
  selectIsAssistEnabled,
  selectNoWorkingExperience,
  setNoWorkingExperience,
  selectOtherExperience,
  setOtherExperience,
  addLink,
} from '@/context/cv-constructor';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import useReduxStringInput from '@/hooks/useReduxStringInput';
import useInput from '@/hooks/useInput';
import useAppDispatch from '@/hooks/useAppDispatch';
import AssistantTip from './AssistantTip';
import AddWorkingExperienceForm from './AddWorkingExperienceForm';
import WorkingExperienceList from './WorkingExperienceList';
import LinksList from './LinksList';
import AddItemButton from './AddItemButton';
import FormTextArea from '@/components/ui/form/FormTextArea';
import FormCheckbox from '@/components/ui/form/FormCheckbox';
import Card from '@/components/ui/Card';
import Modal from '@/components/ui/Modal';
import AddLinkForm from './AddLinkForm';

import classes from './Stage.module.scss';

const toggleState = (prevState: boolean) => !prevState;

const Stage6 = () => {
  const dispatch = useAppDispatch();
  const isAssistEnabled = useSelector(selectIsAssistEnabled);
  const noWorkingExperience = useSelector(selectNoWorkingExperience);
  const [addWorkingExperienceModalIsOpen, setAddWorkingExperienceModalIsOpen] =
    useState(false);
  const [addLinksModalIsOpen, setAddLinksModalIsOpen] = useState(false);
  const otherExperience = useReduxStringInput(
    selectOtherExperience,
    setOtherExperience
  );
  const linkTitleInput = useInput();
  const linkUrlInput = useInput();

  const addWorkingExperienceModalToggleHandler = () => {
    setAddWorkingExperienceModalIsOpen(toggleState);
  };

  const addLinksModalToggleHandler = () => {
    setAddLinksModalIsOpen(toggleState);
  };

  const linkFormSubmissionHandler = () => {
    if (!linkTitleInput.isValid || !linkUrlInput.isValid) {
      linkTitleInput.inputBlurHandler();
      linkUrlInput.inputBlurHandler();
      return;
    }
    dispatch(
      addLink({
        title: linkTitleInput.value,
        url: linkUrlInput.value,
      })
    );
    linkTitleInput.reset();
    linkUrlInput.reset();
    addLinksModalToggleHandler();
  };

  const noWorkingExperienceToggleHandler = () => {
    dispatch(setNoWorkingExperience(!noWorkingExperience));
  };

  return (
    <>
      {addWorkingExperienceModalIsOpen && (
        <Modal onModalClose={addWorkingExperienceModalToggleHandler}>
          <AddWorkingExperienceForm
            onSubmit={addWorkingExperienceModalToggleHandler}
          />
        </Modal>
      )}
      {addLinksModalIsOpen && (
        <Modal onModalClose={addLinksModalToggleHandler}>
          <AddLinkForm
            title={linkTitleInput}
            url={linkUrlInput}
            onSubmit={linkFormSubmissionHandler}
          />
        </Modal>
      )}
      <Card className={classes.body}>
        <h1 id="workingExperienceHeading">Досвід роботи:</h1>
        <AddItemButton
          caption="Додати"
          onClick={addWorkingExperienceModalToggleHandler}
          disabled={noWorkingExperience}
        />
        <WorkingExperienceList />
        <FormCheckbox
          id="noWorkingExperience"
          label="В мене немає досвіду роботи"
          onToggle={noWorkingExperienceToggleHandler}
          checked={noWorkingExperience}
        />
        {isAssistEnabled && (
          <AssistantTip>
            <p>
              Ще можна перерахувати власні проекти, студентські роботи, а також
              залишити корисні посилання, наприклад, на свій GitHub
            </p>
          </AssistantTip>
        )}
        <h1 id="otherExperienceHeading">Інший досвід:</h1>
        <FormTextArea id="otherExperience" input={otherExperience} />
        <h1 id="linksHeading">Посилання</h1>
        <AddItemButton caption="Додати" onClick={addLinksModalToggleHandler} />
        <LinksList />
      </Card>
    </>
  );
};
export default Stage6;
