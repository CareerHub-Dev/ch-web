import { FormEventHandler, useRef, useState } from 'react';
import useAuth from '@/hooks/useAuth';
import useInput from '@/hooks/useInput';
import { getEmailValidity, getPasswordValidity } from '@/lib/util';
import { sendLocalGatewayAuthRequest } from '@/lib/api/local/auth';
import RequestStatus from '@/models/enums/RequestStatus';
import type { CallbackFn } from '@/lib/callback/types';
import AuthField from '../AuthField';
import KeyIcon from '@/components/ui/icons/KeyIcon';
import EnvelopeIcon from '@/components/ui/icons/EnvelopeIcon';
import ModalLoading from '@/components/ui/Modal/ModalLoading';
import ToastContext from '@/lib/toasts/ToastContext';
import ErrorToastStrategy from '@/lib/toasts/strategies/ErrorToastStrategy';
import RoleSelect from '../RoleSelect';
import UserRole from '@/models/enums/UserRole';
import classes from './forms.module.scss';

const LoginForm = () => {
  const auth = useAuth();
  const toastRef = useRef<any>(null);
  const [isProcessingRequest, setIsProcessingRequest] = useState(false);
  const selectedRoleRef = useRef<HTMLSelectElement>(null);
  const emailInputRef = useRef<HTMLInputElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);
  const emailInput = useInput(getEmailValidity);
  const passwordInput = useInput(getPasswordValidity);
  const formIsValid = emailInput.isValid && passwordInput.isValid;

  const requestCallback: CallbackFn = (response) => {
    switch (response.status) {
      case RequestStatus.ResponseRecieved:
        setIsProcessingRequest(false);
        break;
      case RequestStatus.Error:
        const toastContext = new ToastContext();
        toastContext.setStrategy(new ErrorToastStrategy());
        toastContext.notify(response.message, toastRef.current);
        break;
      case RequestStatus.Success:
        const { sessionData, role } = response.data;
        console.log(response.data);

        auth.login(
          sessionData.accessToken,
          sessionData.authorityToken,
          sessionData.accountId,
          role
        );
        break;
      default:
        break;
    }
  };

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
    setIsProcessingRequest(true);
    sendLocalGatewayAuthRequest(
      emailInput.value,
      passwordInput.value,
      true,
      selectedRoleRef.current!.value as UserRole,
      requestCallback
    );
  };

  return (
    <form onSubmit={formSubmissionHandler} id="loginForm">
      {isProcessingRequest && <ModalLoading />}
      <div className={classes.fields} id="authFieldsDiv">
        <RoleSelect id="role" ref={selectedRoleRef} />
        <hr />
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
