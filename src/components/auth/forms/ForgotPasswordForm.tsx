import { useInput } from "@/hooks/useInput";
import useToast from "@/hooks/useToast";
import { forgotPassword, resetPassword } from "@/lib/api/account";
import parseUnknownError from "@/lib/parse-unknown-error";
import { getEmailValidity, getPasswordValidity } from "@/lib/util";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { FormEventHandler, useRef } from "react";
import { AuthField } from "./AuthField";

import classes from "./forms.module.scss";

export const ForgotPasswordForm = () => {
  const router = useRouter();
  const toast = useToast();
  const emailInputRef = useRef<HTMLInputElement>(null);
  const emailInput = useInput({
    validators: [
      (val) =>
        getEmailValidity(val)
          ? { type: "success" }
          : { type: "error", message: "Перевірте коректність поштової адреси" },
    ],
  });
  const newPasswordInputRef = useRef<HTMLInputElement>(null);
  const newPasswordInput = useInput({
    validators: [
      (val) =>
        getPasswordValidity(val)
          ? { type: "success" }
          : { type: "error", message: "Невалідний пароль" },
    ],
  });
  const newPasswordRepeatInputRef = useRef<HTMLInputElement>(null);
  const newPasswordRepeatInput = useInput({
    validators: [
      (val) =>
        getPasswordValidity(val)
          ? { type: "success" }
          : { type: "error", message: "Невалідний пароль" },
      (val) =>
        val === newPasswordInput.value
          ? { type: "success" }
          : { type: "error", message: "Паролі не співпадають" },
    ],
  });
  const forgotPasswordMutation = useMutation(
    ["forgotPassword"],
    forgotPassword,
    {
      onSuccess: (data: any) => {
        toast.success(data.message);
      },
      onError: (e) => {
        toast.error(parseUnknownError(e));
      },
    }
  );
  const resetPasswordMutation = useMutation(["resetPassword"], resetPassword, {
    onSuccess: () => {
      router.push("/auth/login");
    },
  });

  const resetTokenInputRef = useRef<HTMLInputElement>(null);
  const resetTokenInput = useInput();

  const validationHandler = () => {
    emailInput.blur();
    if (emailInput.isValid) {
      toast.setCurrent("Відправляємо листа...");
      forgotPasswordMutation.mutate(emailInput.value);
    } else {
      emailInputRef.current!.focus();
    }
  };

  const resetPasswordHandler = () => {
    resetTokenInput.blur();
    newPasswordInput.blur();
    newPasswordRepeatInput.blur();

    if (
      resetTokenInput.isValid &&
      newPasswordInput.isValid &&
      newPasswordRepeatInput.isValid
    ) {
      toast.setCurrent("Оновлюємо пароль...");
      resetPasswordMutation.mutate({
        password: newPasswordInput.value,
        token: resetTokenInput.value,
      });
    } else if (!resetTokenInput.isValid) {
      resetTokenInputRef.current!.focus();
    } else if (!newPasswordInput.isValid) {
      newPasswordInputRef.current!.focus();
    } else {
      newPasswordRepeatInputRef.current!.focus();
    }
  };

  const forgotPasswordMutationPassed = forgotPasswordMutation.isSuccess;

  const formSubmissionHandler: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    if (!forgotPasswordMutationPassed) {
      validationHandler();
      return;
    }
    resetPasswordHandler();
  };

  return (
    <form onSubmit={formSubmissionHandler} id="forgottenPasswrodForm">
      <div className={classes.fields} id="authFieldsDiv">
        {!forgotPasswordMutationPassed && (
          <AuthField
            ref={emailInputRef}
            label="Пошта"
            id="email"
            placeholder="Уведіть email"
            type="email"
            showError={emailInput.wasBlurred && emailInput.hasErrors}
            onChange={emailInput.change}
            onBlur={emailInput.blur}
            errorMessage="Перевірте коректність поштової адреси"
          />
        )}

        {forgotPasswordMutationPassed && <p>Passed! Check your inbox</p>}
        <input
          id="submitButton"
          type="submit"
          className={classes["auth-button"]}
          value={
            forgotPasswordMutationPassed ? "Підтвердити" : "Відправити лист"
          }
        />
      </div>
    </form>
  );
};
