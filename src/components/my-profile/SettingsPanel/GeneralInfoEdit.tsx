import Card from '@/components/ui/Card';
import FormInput from '@/components/ui/form/FormInput';
import Hr from '@/components/ui/Hr';
import LinkButton from '@/components/ui/LinkButton';
import useInput from '@/hooks/useInput';

import classes from './SettingsPanel.module.scss';

const GeneralInfoEdit = ({
  initialData,
}: {
  initialData: {
    firstName: string;
    lastName: string;
    phoneNumber: string;
    birthDate: string;
  };
}) => {
  const firstNameInput = useInput(
    (value) => value.trim().length >= 2,
    initialData.firstName
  );
  const lastNameInput = useInput(
    (value) => value.trim().length >= 2,
    initialData.lastName
  );
  const phoneInput = useInput((value) => {
    const len = value.trim().length;
    return len >= 10 || len === 0;
  });
  const generalInfoUntouched =
    !firstNameInput.isTouched &&
    !lastNameInput.isTouched &&
    !phoneInput.isTouched;

  const submitGeneralInfo = (event: any) => {
    event.preventDefault();
    if (generalInfoUntouched) {
      return;
    }
  };

  return (
    <Card>
      <h1 className="text-lg font-bold text-center my-2">
        Загальна інформація
      </h1>
      <Hr width="100%" />
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
        <LinkButton style="light-blue-primary" disabled={generalInfoUntouched}>
          Зберегти
        </LinkButton>
      </form>
    </Card>
  );
};
export default GeneralInfoEdit;
