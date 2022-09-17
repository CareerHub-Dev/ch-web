import Card from '@/components/ui/Card';
import FormInput from '@/components/ui/form/FormInput';
import useInput from '@/hooks/useInput';
import useImageUpload from '@/hooks/useImageUpload/v2';
import useStudentQuery from '@/hooks/useStudentQuery';
import LinkButton from '@/components/ui/LinkButton';
import FormImageUpload from '@/components/ui/form/v2/FormImageUpload';
import Hr from '@/components/ui/Hr';

import classes from './SettingsPanel.module.scss';

const h1Classname = 'text-lg font-bold text-center my-2';

const SettingsPanel: React.FC<{
  studentQuery: ReturnType<typeof useStudentQuery>;
}> = ({ studentQuery }) => {
  const studentData = studentQuery.data;
  const firstNameInput = useInput(
    (value) => value.trim().length >= 2,
    studentData?.firstName || ''
  );
  const lastNameInput = useInput(
    (value) => value.trim().length >= 2,
    studentData?.lastName || ''
  );
  const phoneInput = useInput((value) => {
    const len = value.trim().length;
    return len >= 10 || len === 0;
  });
  const generalInfoUntouched =
    firstNameInput.value === studentQuery.data?.firstName &&
    lastNameInput.value === studentQuery.data?.lastName &&
    phoneInput.value === studentQuery.data?.phone;

  const submitGeneralInfo = (event: any) => {
    event.preventDefault();
    if (generalInfoUntouched) {
      return;
    }
  };

  const avatarUpload = useImageUpload({
    initialData: '/default-avatar.png',
  });

  return (
    <div className="mx-32">
      <Card>
        <h1 className={h1Classname}>Загальна інформація</h1>
        <Hr width={'100%'} />
        <form className={classes.form} onSubmit={submitGeneralInfo}>
          <FormInput
            id="firstName"
            label={"Ім'я"}
            placeholder={"Ім'я"}
            input={firstNameInput}
          />
          <FormInput
            id="lastName"
            label={'Прізвище'}
            placeholder={'Прізвище'}
            input={lastNameInput}
          />
          <FormInput
            id="phone"
            label={'Телефон'}
            placeholder={'Телефон'}
            input={phoneInput}
          />
          <LinkButton
            style="light-blue-primary"
            disabled={generalInfoUntouched}
          >
            Зберегти
          </LinkButton>
        </form>
      </Card>
      <Card>
        <h1 className={h1Classname}>Аватар</h1>
        <Hr width={'100%'} />
        <form className={classes.form} onSubmit={submitGeneralInfo}>
          <FormImageUpload upload={avatarUpload} />
        </form>
      </Card>
    </div>
  );
};
export default SettingsPanel;
