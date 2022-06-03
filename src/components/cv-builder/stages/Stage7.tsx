import { useState } from 'react';
import Card from '@/components/ui/Card';
import Modal from '@/components/ui/Modal';
import AddItemButton from './AddItemButton';
import AddEducationForm from './AddEducationForm';
import EducationList from './EducationList';

import classes from './Stage.module.scss';

const Stage7: React.FC = () => {
  const [addEducationModalIsOpen, setAddEducationModalIsOpen] = useState(false);

  const addEducationModalToggleHandler = () => {
    setAddEducationModalIsOpen((prevState) => !prevState);
  };

  return (
    <>
      {addEducationModalIsOpen && (
        <Modal onModalClose={addEducationModalToggleHandler}>
          <AddEducationForm onSubmit={addEducationModalToggleHandler} />
        </Modal>
      )}
      <Card className={classes.body}>
        <h1 id="stageHeading">Освіта:</h1>
        <AddItemButton
          caption="Додати освіту"
          onClick={addEducationModalToggleHandler}
        />
        <EducationList />
      </Card>
    </>
  );
};

export default Stage7;
