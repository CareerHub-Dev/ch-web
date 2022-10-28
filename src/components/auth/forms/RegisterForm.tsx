import { FormEventHandler, useRef } from 'react';
import useInput from '@/hooks/useInput';
import { getStudentEmailValidity, getPasswordValidity } from '@/lib/util';
import AuthField from '../AuthField';
import KeyIcon from '@/components/ui/icons/KeyIcon';
import EnvelopeIcon from '@/components/ui/icons/EnvelopeIcon';
import classes from './forms.module.scss';

const RegisterForm = () => {
  const emailInput = useInput(getStudentEmailValidity);
  const emailInputRef = useRef<HTMLInputElement>(null);
  const passwordInput = useInput(getPasswordValidity);
  const passwordInputRef = useRef<HTMLInputElement>(null);
  const formIsValid = emailInput.isValid && passwordInput.isValid;

  const formSubmissionHandler: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    emailInput.inputBlurHandler();
    passwordInput.inputBlurHandler();
    if (!formIsValid) {
      if (!emailInput.isValid) {
        emailInputRef.current!.focus();
      } else {
        passwordInputRef.current!.focus();
      }
      return;
    }
  };

  return (
    <form onSubmit={formSubmissionHandler} id="registerForm">
      <div className={classes.fields} id="registerFieldsDiv">
        <AuthField
          ref={emailInputRef}
          id="email"
          placeholder="Уведіть пошту"
          type="email"
          isInputInvalid={emailInput.hasError}
          onChange={emailInput.valueChangeHandler}
          onBlur={emailInput.inputBlurHandler}
          validationMessage="Перевірте чи ваша пошта є у домені nure.ua та не містить невалідних символів"
        >
          <EnvelopeIcon />
        </AuthField>
        <AuthField
          ref={passwordInputRef}
          id="password"
          placeholder="Уведіть пароль"
          type="password"
          isInputInvalid={passwordInput.hasError}
          onChange={passwordInput.valueChangeHandler}
          onBlur={passwordInput.inputBlurHandler}
          validationMessage="Пароль повинен бути від 8 до 33 символів серед яких: літери верхнього й нижнього регістру, хоча б одна цифра або спеціальний символ"
        >
          <KeyIcon />
        </AuthField>
        <input
          id="submitButton"
          type="submit"
          className={classes['auth-button']}
          value="Реєстрація"
        />
      </div>
    </form>
  );
};

export default RegisterForm;
