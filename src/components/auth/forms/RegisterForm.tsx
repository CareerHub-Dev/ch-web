import { FormEventHandler, useRef } from 'react';
import useInput from '@/hooks/useInput';
import { getStudentEmailValidity, getPasswordValidity } from '@/lib/util';
import { AuthField } from './AuthField';

export const RegisterForm = () => {
  const emailInput = useInput(getStudentEmailValidity);
  const emailInputRef = useRef<HTMLInputElement>(null);
  const passwordInput = useInput(getPasswordValidity);
  const passwordInputRef = useRef<HTMLInputElement>(null);
  const formIsValid = emailInput.isValid && passwordInput.isValid;

  const handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
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
    <form className="space-y-6" onSubmit={handleSubmit} id="register-form">
      <AuthField
        ref={emailInputRef}
        id="email"
        placeholder="Уведіть пошту"
        type="email"
        showError={emailInput.hasError}
        onChange={emailInput.valueChangeHandler}
        onBlur={emailInput.inputBlurHandler}
        errorMessage="Перевірте чи ваша пошта є у домені nure.ua та не містить невалідних символів"
        label={'Пошта'}
      />
      <AuthField
        ref={passwordInputRef}
        id="password"
        placeholder="Уведіть пароль"
        type="password"
        showError={passwordInput.hasError}
        onChange={passwordInput.valueChangeHandler}
        onBlur={passwordInput.inputBlurHandler}
        errorMessage="Пароль повинен бути від 8 до 33 символів серед яких: літери верхнього й нижнього регістру, хоча б одна цифра або спеціальний символ"
        label="Пароль"
      />
      <button
        type="submit"
        className="flex w-full justify-center rounded-md border border-transparent bg-blue-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all ease-in-out duration-200"
      >
        Зареєструватися
      </button>
    </form>
  );
};
