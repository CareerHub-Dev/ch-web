import Card from '@/components/ui/Card';
import FormInput from '@/components/ui/form/FormInput';
import useInput from '@/hooks/useInput';
import useImageUpload from '@/hooks/useImageUpload';
import useStudentQuery from '@/hooks/useStudentData';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import LinkButton from '@/components/ui/LinkButton';
import FormImageUpload from '@/components/ui/form/FormImageUpload';

import classes from './SettingsPanel.module.scss';

const SettingsPanel = () => {
  const firstNameInput = useInput((value) => value.trim().length >= 2);
  const lastNameInput = useInput((value) => value.trim().length >= 2);
  const phoneInput = useInput((value) => {
    const len = value.trim().length;
    return len >= 10 || len === 0;
  });
  const studentQuery = useStudentQuery({
    onSuccess: (data) => {
      firstNameInput.force(data?.firstName);
      lastNameInput.force(data?.lastName);
      phoneInput.force(data?.phone || '');
    },
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

  if (studentQuery.isLoading) {
    return (
      <div className="g__center">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <>
      <Card>
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
    </>
  );
};
export default SettingsPanel;
