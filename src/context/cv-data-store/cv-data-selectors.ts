import { type StageNumber } from '../cv-ui-store/stages-slice';
import { type CvDataStore } from './cv-data-store';

export type StageCompletionStatus = 'complete' | 'hasErrors' | 'hasWarnings';

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
        return 'hasErrors';
      case 2:
        return 'hasWarnings';
      default:
        return 'hasErrors';
    }
  };
