import { type CvQueryData } from '@/hooks/useCvQuery';
import { arrayInputReducer, type ArrayInputAction } from '@/lib/array-input/v2';
import { validateStringValue } from '@/lib/string-input/v2';
import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import {
  getEmptyCvData,
  restoreToCvQueryData,
  type CvData,
  type ForeignLanguage,
  type ProjectLink,
  type TemplateLanguage
} from './cv';

export type CvDataStore = {
  cvId: null | string;
  cvData: CvData;
  reInit: (id: string) => void;
  discardChanges: (lastSave: CvData | CvQueryData | null) => void;
  changeTitle: (value: string) => void;
  changeTemplateLanguage: (value: TemplateLanguage) => void;
  changeJobPosition: (value: { id: string; name: string }) => void;
  changeFirstName: (value: string) => void;
  changeLastName: (value: string) => void;
  changeGoals: (value: string) => void;
  changeSkillsAndTechnologies: (value: string) => void;
  changeExperienceHighlights: (value: string) => void;
  dispatchForeignLanguages: (action: ArrayInputAction<ForeignLanguage>) => void;
  dispatchProjectLinks: (action: ArrayInputAction<ProjectLink>) => void;
};

export const useCvDataStore = create<CvDataStore>()(
  immer((set) => ({
    cvId: null,
    cvData: getEmptyCvData(),
    reInit: (id) =>
      set((state) => {
        state.cvId = id;
        state.cvData = getEmptyCvData();
      }),
    discardChanges: (lastSave) =>
      set((state) => {
        if (!lastSave) {
          state.cvData = getEmptyCvData();
          return;
        }
        if (typeof lastSave.title === 'string') {
          state.cvData = restoreToCvQueryData(lastSave as CvQueryData);
        }
        state.cvData = lastSave as CvData;
      }),
    changeTitle: (value) =>
      set((state) => {
        state.cvData.title = validateStringValue({
          value,
          validators: [
            (val) =>
              val.length > 0
                ? { type: 'success' }
                : {
                    type: 'error',
                    message: 'Назва не має бути порожнею',
                  },
          ],
        });
      }),
    changeJobPosition: (value) =>
      set((state) => {
        state.cvData.jobPosition = value;
      }),
    changeTemplateLanguage: (value) =>
      set((state) => {
        state.cvData.templateLanguage = value;
      }),
    changeFirstName: (value) =>
      set((state) => {
        state.cvData.firstName = validateStringValue({
          value,
          validators: [
            (val) =>
              val.length > 0
                ? { type: 'success' }
                : {
                    type: 'error',
                    message: "Ім'я не може бути порожнім",
                  },
          ],
        });
      }),
    changeLastName: (value) =>
      set((state) => {
        state.cvData.lastName = validateStringValue({
          value,
          validators: [
            (val) =>
              val.length > 0
                ? { type: 'success' }
                : {
                    type: 'error',
                    message: 'Прізвище не може бути порожнім',
                  },
          ],
        });
      }),
    changeGoals: (value) =>
      set((state) => {
        state.cvData.goals = validateStringValue({
          value,
          validators: [
            (val) =>
              val.length > 0
                ? { type: 'success' }
                : {
                    type: 'warning',
                    message: 'Це поле краще заповнити',
                  },
            (val) =>
              val.length <= 200
                ? { type: 'success' }
                : {
                    type: 'error',
                    message: 'Перевищено ліміт у 200 символів',
                  },
          ],
        });
      }),
    changeSkillsAndTechnologies: (value) =>
      set((state) => {
        state.cvData.skillsAndTechnologies = validateStringValue({
          value,
          validators: [
            (val) =>
              val.length > 0
                ? { type: 'success' }
                : {
                    type: 'warning',
                    message: 'Це поле краще заповнити',
                  },
            (val) =>
              val.length <= 200
                ? { type: 'success' }
                : {
                    type: 'error',
                    message: 'Перевищено ліміт у 200 символів',
                  },
          ],
        });
      }),
    changeExperienceHighlights: (value) =>
      set((state) => {
        state.cvData.experienceHighlights = validateStringValue({
          value,
          validators: [
            (val) =>
              val.length > 0
                ? { type: 'success' }
                : {
                    type: 'warning',
                    message: 'Це поле краще заповнити',
                  },
            (val) =>
              val.length <= 200
                ? { type: 'success' }
                : {
                    type: 'error',
                    message: 'Перевищено ліміт у 200 символів',
                  },
          ],
        });
      }),
    dispatchForeignLanguages: (action) =>
      set((state) => {
        state.cvData.foreignLanguages = arrayInputReducer({
          input: state.cvData.foreignLanguages,
          action,
          validators: [],
        });
      }),
    dispatchProjectLinks: (action) =>
      set((state) => {
        state.cvData.projectLinks = arrayInputReducer({
          input: state.cvData.projectLinks,
          action,
          validators: [],
        });
      }),
  }))
);

/* const emptyState = {
  cvId: null,
  cvData: getEmptyCvData(),
  reInit: () => {},
  discardChanges: () => {},
  changeTitle: () => {},
  changeTemplateLanguage: () => {},
  changeJobPosition: () => {},
  changeFirstName: () => {},
  changeLastName: () => {},
  changeGoals: () => {},
  changeSkillsAndTechnologies: () => {},
  changeExperienceHighlights: () => {},
  dispatchForeignLanguages: () => {},
};

export const useCvDataStore = ((selector, compare) => {
  const store = useCvDataStoreBase(selector, compare);
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => setHydrated(true), []);

  return hydrated ? store : selector(emptyState);
}) as typeof useCvDataStoreBase;
 */
