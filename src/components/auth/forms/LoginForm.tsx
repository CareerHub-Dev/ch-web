import { FormEventHandler, useRef } from 'react';
import useAuth from '@/hooks/useAuth';
import useToast from '@/hooks/useToast';
import useInput from '@/hooks/useInput';
import { useMutation } from '@tanstack/react-query';
import { getEmailValidity, getPasswordValidity } from '@/lib/util';
import { authenticate } from '@/lib/api/local/account';
import AuthField from '../AuthField';
import KeyIcon from '@/components/ui/icons/KeyIcon';
import EnvelopeIcon from '@/components/ui/icons/EnvelopeIcon';
import ModalLoading from '@/components/ui/Modal/ModalLoading';
import classes from './forms.module.scss';

const LoginForm = () => {
  const auth = useAuth();
  const toast = useToast();
  const emailInputRef = useRef<HTMLInputElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);
  const emailInput = useInput(getEmailValidity);
  const passwordInput = useInput(getPasswordValidity);
  const formIsValid = emailInput.isValid && passwordInput.isValid;
  const authMutation = useMutation(['auth'], authenticate, {
    onSuccess: (data: any) => {
      auth.login(data);
    },
    onError: (error) => {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    },
  });

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
    authMutation.mutate({
      email: emailInput.value,
      password: passwordInput.value,
    });
  };

  return (
    <form onSubmit={formSubmissionHandler} id="loginForm">
      {authMutation.isLoading && <ModalLoading />}
      <div className={classes.fields} id="authFieldsDiv">
        <AuthField
          ref={emailInputRef}
          id="email"
          placeholder="Уведіть email"
          type="email"
          isInputInvalid={emailInput.hasError}
          onChange={emailInput.valueChangeHandler}
          onBlur={emailInput.inputBlurHandler}
          validationMessage="Перевірте коректність поштової адреси"
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
          value="Увійти"
        />
      </div>
    </form>
  );
};

export default LoginForm;
