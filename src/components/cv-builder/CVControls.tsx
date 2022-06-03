import { useState } from 'react';
import { useSelector } from 'react-redux';
import useAppDispatch from '@/hooks/useAppDispatch';
import {
  selectStageErrors,
  enforceStageValidation,
} from '@/store/cv-constructor';
import ProgressBar from './ProgressBar';
import StageDisplay from './StageDisplay';
import Card from '@/components/ui/Card';

import classes from './CVControls.module.scss';

const getProgressEstimation = (currentStage: number) =>
  [0, 5, 10, 20, 35, 50, 75, 90, 100][currentStage];

const completionStage = 8;

const CVControls: React.FC = () => {
  // TODO: extract buttons into a separate component
  const dispatch = useAppDispatch();
  const [currentStage, setCurrentStage] = useState(0);
  const progress = getProgressEstimation(currentStage);
  const currentStageInputs = useSelector(selectStageErrors(currentStage));
  const currentStageHasInvalidInputs = currentStageInputs.some(
    (item) => !item.isValid
  );
  const currentStageHasErrors = currentStageInputs.some(
    (item) => item.hasError
  );

  const nextClickHandler = () => {
    if (currentStageHasErrors) {
      return;
    }
    if (currentStageHasInvalidInputs) {
      dispatch(enforceStageValidation(currentStage));
      return;
    }
    setCurrentStage(currentStage + 1);
  };

  const previousClickHandler = () => {
    setCurrentStage(currentStage - 1);
  };

  return (
    <div>
      <Card>
        {currentStage !== 0 && (
          <button className={classes['save-button']}>Зберегти та вийти</button>
        )}
        <ProgressBar completed={progress} bgColor="#0040d2" />
        <div className={classes['stage-controls']}>
          <button onClick={previousClickHandler} disabled={currentStage === 0}>
            Назад
          </button>
          <button
            onClick={nextClickHandler}
            disabled={currentStageHasErrors || currentStage >= completionStage}
          >
            Далі
          </button>
        </div>
      </Card>
      <StageDisplay stage={currentStage} />
    </div>
  );
};

export default CVControls;
