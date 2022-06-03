import { FormEventHandler, useContext, useRef, useState } from 'react';
import useInput from '@/hooks/useInput';
import { getStudentEmailValidity, getPasswordValidity } from '@/lib/util';
import AuthField from '../AuthField';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faKey } from '@fortawesome/free-solid-svg-icons';
import { faEnvelope } from '@fortawesome/free-regular-svg-icons';
import { CallbackFn } from '@/lib/util/callback/types';
import RequestStatus from '@/model/enums/RequestStatus';
import AuthContext from '@/store/auth-context';
import { useRouter } from 'next/router';
import ToastContext from '@/lib/util/toasts/ToastContext';
import ErrorToastStrategy from '@/lib/util/toasts/strategies/ErrorToastStrategy';
import { sendAuthRequest } from '@/lib/api/auth';
import ModalLoading from '@/components/ui/Modal/ModalLoading';
import classes from './forms.module.scss';

const RegisterForm = () => {
  const authCtx = useContext(AuthContext);
  const router = useRouter();
  const toastRef = useRef<any>(null);
  const [isProcessingRequest, setIsProcessingRequest] = useState(false);
  const emailInput = useInput(getStudentEmailValidity);
  const emailInputRef = useRef<HTMLInputElement>(null);
  const passwordInput = useInput(getPasswordValidity);
  const passwordInputRef = useRef<HTMLInputElement>(null);
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
        const { userId, jwtToken, role } = response.data;
        const now = new Date();
        const expiresAt = new Date(now.setHours(now.getHours() + 24 * 7));
        authCtx.login(jwtToken, expiresAt.toISOString());
        router.push('/offers/feed');
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
    sendAuthRequest(
      emailInput.value,
      passwordInput.value,
      false,
      requestCallback
    );
  };

  return (
    <form onSubmit={formSubmissionHandler} id="registerForm">
      {isProcessingRequest && <ModalLoading />}
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
          value="Реєстрація"
        />
      </div>
    </form>
  );
};

export default RegisterForm;
