import { type StageNumber } from '../cv-ui-store/stages-slice';
import { type CvDataStore } from './cv-data-store';

export type StageCompletionStatus =
  | 'complete'
  | 'hasErrors'
  | 'hasWarnings'
  | 'incomplete';

export const getStageCompletionStatus =
  (stage: StageNumber) =>
  (store: CvDataStore): StageCompletionStatus => {
    switch (stage) {
      case 0: {
        const jobPositionNotSpecified = !store.cvData.jobPosition;
        if (jobPositionNotSpecified) {
          return 'hasErrors';
        }
        return 'complete';
      }
      case 1:
        const { firstName, lastName } = store.cvData;
        return summarizeInputs(firstName, lastName);
      case 2:
        // const { photo } = store.cvData;
        return 'incomplete';
      case 3:
        const { goals } = store.cvData;
        return summarizeInputs(goals);
      case 4:
        const { skillsAndTechnologies } = store.cvData;
        return summarizeInputs(skillsAndTechnologies);
      case 5:
        const { foreignLanguages } = store.cvData;
        return summarizeInputs(foreignLanguages);
      default:
        return 'hasErrors';
    }
  };

function summarizeInputs<TInput extends Inputs.BaseInput>(
  ...inputs: TInput[]
): StageCompletionStatus {
  if (inputs.some((item) => item.errors.length > 0)) {
    return 'hasErrors';
  }
  if (inputs.some((item) => item.warnings.length > 0)) {
    return 'hasWarnings';
  }
  if (inputs.some((item) => !item.isTouched)) {
    return 'incomplete';
  }
  return 'complete';
}
