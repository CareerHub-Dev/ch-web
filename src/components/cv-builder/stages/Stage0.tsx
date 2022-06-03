import {
  selectJobType,
  selectTemplateLanguage,
  selectIsAssistEnabled,
  setJobType,
  setTemplateLanguage,
  setIsAssistEnabled,
} from '@/store/cv-constructor';
import { useSelector } from 'react-redux';
import useReduxStringInput from '@/hooks/useReduxStringInput';
import useAppDispatch from '@/hooks/useAppDispatch';
import CVJobType from '@/model/enums/CVJobType';
import CVTemplateLanguage from '@/model/enums/CVTemplateLanguage';
import AssistantTip from './AssistantTip';
import Card from '@/components/ui/Card';
import FormSelect from '@/components/ui/form/FormSelect';
import FormCheckbox from '@/components/ui/form/FormCheckbox';

import classes from './Stage.module.scss';

type InputChangeEvent = React.ChangeEvent<HTMLInputElement>;

const jobTypeOptions = [
  { value: CVJobType.Dev, text: 'Розробка ПЗ' },
  { value: CVJobType.QA, text: 'Тестування ПЗ' },
  { value: CVJobType.Design, text: 'Дизайн' },
  { value: CVJobType.Finances, text: 'Фінанси' },
  { value: CVJobType.Marketing, text: 'Маркетінг' },
  { value: CVJobType.CustomerService, text: 'Підтримка клієнтів' },
];

const templateLanguageOptions = [
  { value: CVTemplateLanguage.En, text: 'Англійська' },
  { value: CVTemplateLanguage.Ua, text: 'Українська' },
];

const Stage0: React.FC = () => {
  const jobTypeInput = useReduxStringInput(selectJobType, setJobType);
  const templateLanguageInput = useReduxStringInput(
    selectTemplateLanguage,
    setTemplateLanguage
  );
  const isAssistEnabled = useSelector(selectIsAssistEnabled);

  const dispatch = useAppDispatch();

  const isAssistEnabledChangeHandler = (event: InputChangeEvent) => {
    dispatch(setIsAssistEnabled(event.target.checked));
  };

  return (
    <>
      <Card className={classes.body}>
        <h1>Перед початком, будь ласка:</h1>
        <FormSelect
          id="jobType"
          selectionState={jobTypeInput}
          options={jobTypeOptions}
          label="Виберіть тип роботи:"
        />
        {['dev', 'qa'].includes(jobTypeInput.value) && (
          <AssistantTip
            type={
              templateLanguageInput.value === CVTemplateLanguage.En
                ? 'good-example'
                : 'default'
            }
          >
            <p>
              У сфері IT всюди використовується англійська мова, тому у якості
              мови шаблону краще обрати саме її.
            </p>
          </AssistantTip>
        )}
        <FormSelect
          id="templateLanguage"
          selectionState={templateLanguageInput}
          options={templateLanguageOptions}
          label="Виберіть мову шаблону:"
        />
        <FormCheckbox
          id="assistant"
          label="Включити допомогу під час створення резюме"
          checked={isAssistEnabled}
          onToggle={isAssistEnabledChangeHandler}
        />
      </Card>
      <AssistantTip>
        <p>Створення резюме складатиметься з наступних етапів:</p>
        <br />
        <ol className={classes['ordered-list']}>
          <li>
            Вибір типу роботи та мови шаблону, на котрій буде створено твоє
            резюме
          </li>
          <li>
            Підтвердження твого імені та прізвища, що буде показано у резюме
          </li>
          <li>(Опціональне) завантаження твого фото</li>
          <li>Опис цілей</li>
          <li>Опис професійних навичок та знань</li>
          <li>Складання списку знайомих іноземних мов</li>
          <li>Опис профейсійного досвіду</li>
          <li>Опис освіти</li>
        </ol>
      </AssistantTip>
    </>
  );
};

export default Stage0;
