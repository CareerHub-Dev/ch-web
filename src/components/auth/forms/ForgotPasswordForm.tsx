import { useRouter } from 'next/router';
import { FormEventHandler, useRef, useState } from 'react';
import useInput from '@/hooks/useInput';
import type { CallbackFn } from '@/lib/callback/types';
import { getEmailValidity, getPasswordValidity } from '@/lib/util';
import ErrorToastStrategy from '@/lib/toasts/strategies/ErrorToastStrategy';
import SuccessToastStrategy from '@/lib/toasts/strategies/SuccessToastStrategy';
import ToastContext from '@/lib/toasts/ToastContext';
import { toast } from 'react-toastify';
import {
  sendForgotPasswordRequest,
  sendResetPasswordRequest,
} from '@/lib/api/remote/auth';
import RequestStatus from '@/models/enums/RequestStatus';
import AuthField from '../AuthField';
import KeyIcon from '@/components/ui/icons/KeyIcon';
import EnvelopeIcon from '@/components/ui/icons/EnvelopeIcon';

import classes from './forms.module.scss';

const ForgotPasswordForm = () => {
  const router = useRouter();
  const toastRef = useRef<any>(null);
  const emailInputRef = useRef<HTMLInputElement>(null);
  const emailInput = useInput(getEmailValidity);
  const newPasswordInputRef = useRef<HTMLInputElement>(null);
  const newPasswordInput = useInput(getPasswordValidity);
  const newPasswordRepeatInputRef = useRef<HTMLInputElement>(null);
  const newPasswordRepeatInput = useInput(
    (value: string) => value === newPasswordInput.value,
  );

  const [verificationRequestPassed, setVerificationRequestPassed] =
    useState(false);

  const resetTokenInputRef = useRef<HTMLInputElement>(null);
  const resetTokenInput = useInput();

  const createCallback: (onSuccess: () => void) => CallbackFn = (
    onSuccess: () => void,
  ) => {
    return ({
      status,
      message,
    }: {
      status: RequestStatus;
      message?: string;
    }) => {
      const toastContext = new ToastContext();

      switch (status) {
        case RequestStatus.Error:
          toastContext.setStrategy(new ErrorToastStrategy());
          break;
        case RequestStatus.Success:
          toastContext.setStrategy(new SuccessToastStrategy());
          onSuccess();
          break;
        default:
          break;
      }
      toastContext.notify(
        message ? message : 'Невідома помилка',
        toastRef.current,
      );
    };
  };

  const verificationRequestCallback = createCallback(
    setVerificationRequestPassed.bind(null, true),
  );

  const resetPasswordRequestCallback = createCallback(
    router.push.bind(null, '/auth/login'),
  );

  const validationHandler = () => {
    emailInput.inputBlurHandler();
    if (emailInput.isValid) {
      toastRef.current = toast('Відправляємо листа...');
      sendForgotPasswordRequest(emailInput.value, verificationRequestCallback);
    } else {
      emailInputRef.current!.focus();
    }
  };

  const resetPasswordHandler = () => {
    resetTokenInput.inputBlurHandler();
    newPasswordInput.inputBlurHandler();
    newPasswordRepeatInput.inputBlurHandler();

    if (
      resetTokenInput.isValid &&
      newPasswordInput.isValid &&
      newPasswordRepeatInput.isValid
    ) {
      toastRef.current = toast('Оновлюємо пароль...');
      sendResetPasswordRequest(
        newPasswordInput.value,
        resetTokenInput.value,
        resetPasswordRequestCallback,
      );
    } else if (!resetTokenInput.isValid) {
      resetTokenInputRef.current!.focus();
    } else if (!newPasswordInput.isValid) {
      newPasswordInputRef.current!.focus();
    } else {
      newPasswordRepeatInputRef.current!.focus();
    }
  };

  const formSubmissionHandler: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    if (!verificationRequestPassed) {
      validationHandler();
      return;
    }
    resetPasswordHandler();
  };

  return (
    <form onSubmit={formSubmissionHandler} id="forgottenPasswrodForm">
      <div className={classes.fields} id="authFieldsDiv">
        {!verificationRequestPassed && (
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
        )}

        {verificationRequestPassed && (
          <>
            <AuthField
              ref={resetTokenInputRef}
              id="resetToken"
              placeholder="Введіть код з листу"
              type="text"
              isInputInvalid={resetTokenInput.hasError}
              onChange={resetTokenInput.valueChangeHandler}
              onBlur={resetTokenInput.inputBlurHandler}
              validationMessage="Перевірте що код введено"
            />
            <AuthField
              ref={newPasswordInputRef}
              id="newPassword"
              placeholder="Уведіть пароль"
              type="password"
              isInputInvalid={newPasswordInput.hasError}
              onChange={newPasswordInput.valueChangeHandler}
              onBlur={newPasswordInput.inputBlurHandler}
              validationMessage="Пароль повинен бути від 8 до 33 символів серед яких: літери верхнього й нижнього регістру, хоча б одна цифра або спеціальний символ"
            >
              <KeyIcon />
            </AuthField>
            <AuthField
              ref={newPasswordRepeatInputRef}
              id="repeatNewPassword"
              placeholder="Півторить пароль"
              type="password"
              isInputInvalid={newPasswordRepeatInput.hasError}
              onChange={newPasswordRepeatInput.valueChangeHandler}
              onBlur={newPasswordRepeatInput.inputBlurHandler}
              validationMessage="Паролі мають бути однаковими"
            >
              <KeyIcon />
            </AuthField>
          </>
        )}
        <input
          id="submitButton"
          type="submit"
          className={classes['auth-button']}
          value={verificationRequestPassed ? 'Підтвердити' : 'Відправити лист'}
        />
      </div>
    </form>
  );
};

export default ForgotPasswordForm;
