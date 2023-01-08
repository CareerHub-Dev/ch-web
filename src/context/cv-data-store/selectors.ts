import { type CvDataStore } from './cv-data-store';

type StageStatus = 'complete' | 'incomplete' | 'error';
type StageStatusSelector = (store: CvDataStore) => StageStatus;

export const selectStageStatus =
  (stage: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7) => (store: CvDataStore) => {
    const selector = [selectStage0Status].at(stage);

    if (selector) {
      return selector(store);
    }
    return 'error';
  };

export const selectStage0Status: StageStatusSelector = (store) => {
  const data = store.cvData;
  if (data.jobPosition === null) return 'incomplete';
  return 'complete';
};
