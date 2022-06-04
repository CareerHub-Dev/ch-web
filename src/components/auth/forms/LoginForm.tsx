import { FormEventHandler, useRef, useState } from 'react';
import useAuth from '@/hooks/useAuth';
import { useRouter } from 'next/router';
import useInput from '@/hooks/useInput';
import { getStudentEmailValidity, getPasswordValidity } from '@/lib/util';
import { sendLocalGatewayAuthRequest } from '@/lib/api/local/auth';
import RequestStatus from '@/models/enums/RequestStatus';
import type { CallbackFn } from '@/lib/util/callback/types';
import AuthField from '../AuthField';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faKey } from '@fortawesome/free-solid-svg-icons';
import { faEnvelope } from '@fortawesome/free-regular-svg-icons';
import ModalLoading from '@/components/ui/Modal/ModalLoading';
import ToastContext from '@/lib/util/toasts/ToastContext';
import ErrorToastStrategy from '@/lib/util/toasts/strategies/ErrorToastStrategy';
import classes from './forms.module.scss';

const LoginForm = () => {
  const auth = useAuth();
  const router = useRouter();
  const toastRef = useRef<any>(null);
  const [isProcessingRequest, setIsProcessingRequest] = useState(false);
  const emailInputRef = useRef<HTMLInputElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);
  const emailInput = useInput(getStudentEmailValidity);
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

        auth.login(sessionData.accessToken, sessionData.authorityToken, role);
        router.push('/offers');
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
      requestCallback
    );
  };

  return (
    <form onSubmit={formSubmissionHandler} id="loginForm">
      {isProcessingRequest && <ModalLoading />}
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
          <FontAwesomeIcon id="newPasswordIcon" icon={faEnvelope} />
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
          <FontAwesomeIcon id="newPasswordIcon" icon={faKey} />
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
