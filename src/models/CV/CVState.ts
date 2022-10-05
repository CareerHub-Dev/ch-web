import Education from './Education';
import WorkingExperience from './WorkingExperience';
import Language from './Language';
import Link from './Link';
import { getArrayInput } from '../ArrayInput';
import { getStringInput } from '../StringInput';
import CVTemplateLanguage from '../../lib/enums/CVTemplateLanguage';

type CVState = {
  title: StringInput;
  jobType: StringInput;
  jobPosition: StringInput;
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
  title: getStringInput(),
  jobType: getStringInput(),
  jobPosition: getStringInput(),
  templateLanguage: getStringInput(CVTemplateLanguage.Ua),
  name: getStringInput(),
  surname: getStringInput(),
  photo: getStringInput('', true, false),
  goals: getStringInput(),
  skillsAndTechnologies: getStringInput(),
  languages: getArrayInput<IndexedObject<Language>>(),
  workingExperience: getArrayInput<IndexedObject<WorkingExperience>>(),
  otherExperience: getStringInput(),
  links: getArrayInput<IndexedObject<Link>>(),
  education: getArrayInput<IndexedObject<Education>>(),
};
