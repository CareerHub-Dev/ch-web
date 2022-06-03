import Education from './Education';
import WorkingExperience from './WorkingExperience';
import Language from './Language';
import Link from './Link';
import IndexedObject from '../IndexedObject';
import ArrayInput, { getArrayInput } from '../ArrayInput';
import StringInput, { getStringInut } from '../StringInput';
import CVTemplateLanguage from '../enums/CVTemplateLanguage';

type CVState = {
  jobType: StringInput;
  templateLanguage: StringInput;
  name: StringInput;
  surname: StringInput;
  photo: StringInput;
  goals: StringInput;
  skillsAndTechnologies: StringInput;
  languages: ArrayInput<IndexedObject<Language>>;
  workingExperience: ArrayInput<IndexedObject<WorkingExperience>>;
  otherExperience: StringInput;
  links: ArrayInput<IndexedObject<Link>>;
  education: ArrayInput<IndexedObject<Education>>;
};

export default CVState;

export const enforceInputValidation = (
  input: ArrayInput<any> | StringInput
) => {
  input.isTouched = true;
};

export const initialCVState: CVState = {
  jobType: getStringInut(),
  templateLanguage: getStringInut(CVTemplateLanguage.Ua),
  name: getStringInut(),
  surname: getStringInut(),
  photo: getStringInut('', true, false),
  goals: getStringInut(),
  skillsAndTechnologies: getStringInut(),
  languages: getArrayInput<IndexedObject<Language>>(),
  workingExperience: getArrayInput<IndexedObject<WorkingExperience>>(),
  otherExperience: getStringInut(),
  links: getArrayInput<IndexedObject<Link>>(),
  education: getArrayInput<IndexedObject<Education>>(),
};
