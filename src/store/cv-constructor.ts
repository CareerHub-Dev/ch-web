import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '.';
import StringInput, { setStringInputValue } from '@/models/StringInput';
import ArrayInput, {
  disableArrayInput,
  getArrayInput,
  addArrayInputItem,
  removeArrayInputItem,
} from '@/models/ArrayInput';
import Language from '@/models/CV/Language';
import WorkingExperience from '@/models/CV/WorkingExperience';
import Link from '@/models/CV/Link';
import Education from '@/models/CV/Education';
import CVState, {
  initialCVState,
  enforceInputValidation,
} from '@/models/CV/CVState';

type CvStore = {
  cvState: CVState;
  progress: number;
  isAssistEnabled: boolean;
  noWorkingExperience: boolean;
};

const initialConstructorState: CvStore = {
  cvState: initialCVState,
  progress: 0,
  isAssistEnabled: true,
  noWorkingExperience: false,
};

const cvConstructorSlice = createSlice({
  name: 'cvConstructor',
  initialState: initialConstructorState,
  reducers: {
    setJobType: (state, action: PayloadAction<string>) => {
      setStringInputValue(state.cvState.jobType, action.payload);
    },
    setTemplateLanguage: (state, action: PayloadAction<string>) => {
      setStringInputValue(state.cvState.templateLanguage, action.payload);
    },
    setIsAssistEnabled: (state, action: PayloadAction<boolean>) => {
      state.isAssistEnabled = action.payload;
    },
    setNoWorkingExperience: (state, action: PayloadAction<boolean>) => {
      const payload = action.payload;
      if (payload) {
        disableArrayInput(state.cvState.workingExperience);
      } else {
        state.cvState.workingExperience = getArrayInput();
      }
      state.noWorkingExperience = payload;
    },
    setName: (state, action: PayloadAction<string>) => {
      setStringInputValue(state.cvState.name, action.payload);
    },
    setSurname: (state, action: PayloadAction<string>) => {
      setStringInputValue(state.cvState.surname, action.payload);
    },
    setPhoto: (state, action: PayloadAction<string>) => {
      setStringInputValue(state.cvState.photo, action.payload, () => true);
    },
    setGoals: (state, action: PayloadAction<string>) => {
      const goalsValidationFn = (value: string) => {
        const trimmedValue = value.trim();
        return trimmedValue !== '' && trimmedValue.length <= 200;
      };
      setStringInputValue(
        state.cvState.goals,
        action.payload,
        goalsValidationFn
      );
    },
    setSkillsAndTechnologies: (state, action: PayloadAction<string>) => {
      setStringInputValue(state.cvState.skillsAndTechnologies, action.payload);
    },
    addLanguage: (state, action: PayloadAction<Language>) => {
      addArrayInputItem(state.cvState.languages, action.payload);
    },
    removeLanguage: (state, action: PayloadAction<string>) => {
      removeArrayInputItem(state.cvState.languages, action.payload);
    },
    addWorkingExperience: (state, action: PayloadAction<WorkingExperience>) => {
      addArrayInputItem(state.cvState.workingExperience, action.payload);
    },
    removeWorkingExperience: (state, action: PayloadAction<string>) => {
      removeArrayInputItem(state.cvState.workingExperience, action.payload);
    },
    setOtherExperience: (state, action: PayloadAction<string>) => {
      setStringInputValue(state.cvState.otherExperience, action.payload);
    },
    addLink: (state, action: PayloadAction<Link>) => {
      addArrayInputItem(state.cvState.links, action.payload);
    },
    removeLink: (state, action: PayloadAction<string>) => {
      removeArrayInputItem(state.cvState.links, action.payload);
    },
    addEducation: (state, action: PayloadAction<Education>) => {
      addArrayInputItem(state.cvState.education, action.payload);
    },
    removeEducation: (state, action: PayloadAction<string>) => {
      removeArrayInputItem(state.cvState.education, action.payload);
    },
    setProgress: (state, action: PayloadAction<number>) => {
      state.progress = action.payload;
    },
    enforceStageValidation: (state, action: PayloadAction<number>) => {
      switch (action.payload) {
        case 0:
          enforceInputValidation(state.cvState.jobType);
          return;
        case 1:
          enforceInputValidation(state.cvState.name);
          enforceInputValidation(state.cvState.surname);
          return;
        // Second stage contains optional photo upload,
        // so its validation is omitted here
        case 3:
          enforceInputValidation(state.cvState.goals);
          return;
        case 4:
          enforceInputValidation(state.cvState.skillsAndTechnologies);
          return;
        case 5:
          enforceInputValidation(state.cvState.languages);
          return;
        case 6:
          enforceInputValidation(state.cvState.workingExperience);
          enforceInputValidation(state.cvState.otherExperience);
          return;
        case 7:
          enforceInputValidation(state.cvState.education);
          return;
        default:
          return;
      }
    },
  },
});

// Auxilary
export type TransformedStringInput = {
  value: string;
  isValid: boolean;
  hasError: boolean;
};

export type TransformedArrayInput<T> = {
  items: Array<T>;
  isValid: boolean;
  hasError: boolean;
};

const getTransformedStringInput = (input: StringInput) =>
  ({
    value: input.value,
    isValid: input.isValid,
    hasError: input.isTouched && !input.isValid,
  } as TransformedStringInput);

const getTransformedArrayInput = <T>(input: ArrayInput<T>) => ({
  items: input.value,
  isValid: input.isValid,
  hasError: input.isTouched && !input.isValid,
});

const getInputValidityAndError = (input: StringInput | ArrayInput<any>) => ({
  isValid: input.isValid,
  hasError: input.isTouched && !input.isValid,
});

//Selectors
export const selectEntireCVState = (state: RootState) => {
  const cvState = state.cvConstructor.cvState;
  return {
    jobType: cvState.jobType.value,
    name: cvState.name.value,
    surname: cvState.surname.value,
    photo: cvState.photo.value.length === 0 ? null : cvState.photo.value,
    goals: cvState.goals.value,
    skillsAndTechnologies: cvState.skillsAndTechnologies.value,
    languages: cvState.languages.value,
    workingExperience: state.cvConstructor.noWorkingExperience
      ? null
      : cvState.workingExperience.value,
    otherExperience: cvState.otherExperience.value,
    links: cvState.links.value,
    education: cvState.education.value,
    templateLanguage: cvState.templateLanguage.value,
  };
};
export const selectStageErrors = (stage: number) => (state: RootState) => {
  // TODO: find a way to refactor this
  const cvState = state.cvConstructor.cvState;
  switch (stage) {
    case 0:
      return [getInputValidityAndError(cvState.jobType)];
    case 1:
      return [cvState.name, cvState.surname].map((item) =>
        getInputValidityAndError(item)
      );
    case 3:
      return [getInputValidityAndError(cvState.goals)];
    case 4:
      return [getInputValidityAndError(cvState.skillsAndTechnologies)];
    case 5:
      return [getInputValidityAndError(cvState.languages)];
    case 6:
      return [cvState.workingExperience, cvState.otherExperience].map((item) =>
        getInputValidityAndError(item)
      );
    case 7:
      return [getInputValidityAndError(cvState.education)];
    default:
      return [];
  }
};
export const selectProgress = (state: RootState) =>
  state.cvConstructor.progress;
export const selectIsAssistEnabled = (state: RootState) =>
  state.cvConstructor.isAssistEnabled;
export const selectNoWorkingExperience = (state: RootState) =>
  state.cvConstructor.noWorkingExperience;
export const selectJobType = (state: RootState) =>
  getTransformedStringInput(state.cvConstructor.cvState.jobType);
export const selectTemplateLanguage = (state: RootState) =>
  getTransformedStringInput(state.cvConstructor.cvState.templateLanguage);
export const selectName = (state: RootState) =>
  getTransformedStringInput(state.cvConstructor.cvState.name);
export const selectSurname = (state: RootState) =>
  getTransformedStringInput(state.cvConstructor.cvState.surname);
export const selectPhoto = (state: RootState) =>
  getTransformedStringInput(state.cvConstructor.cvState.photo);
export const selectGoals = (state: RootState) =>
  getTransformedStringInput(state.cvConstructor.cvState.goals);
export const selectSkillsAndTechnologies = (state: RootState) =>
  getTransformedStringInput(state.cvConstructor.cvState.skillsAndTechnologies);
export const selectLanguages = (state: RootState) =>
  getTransformedArrayInput(state.cvConstructor.cvState.languages);
export const selectWorkingExperience = (state: RootState) =>
  getTransformedArrayInput(state.cvConstructor.cvState.workingExperience);
export const selectOtherExperience = (state: RootState) =>
  getTransformedStringInput(state.cvConstructor.cvState.otherExperience);
export const selectLinks = (state: RootState) =>
  getTransformedArrayInput(state.cvConstructor.cvState.links);
export const selectEducation = (state: RootState) =>
  getTransformedArrayInput(state.cvConstructor.cvState.education);

export const {
  setJobType,
  setTemplateLanguage,
  setIsAssistEnabled,
  setNoWorkingExperience,
  setName,
  setSurname,
  setPhoto,
  setGoals,
  setSkillsAndTechnologies,
  addLanguage,
  removeLanguage,
  addWorkingExperience,
  removeWorkingExperience,
  setOtherExperience,
  addLink,
  removeLink,
  addEducation,
  removeEducation,
  setProgress,
  enforceStageValidation,
} = cvConstructorSlice.actions;

export default cvConstructorSlice.reducer;
