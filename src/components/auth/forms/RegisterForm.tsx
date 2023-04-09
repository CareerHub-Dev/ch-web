import { FormEventHandler, useRef } from "react";
import { useMutation } from "@tanstack/react-query";
import { useInput } from "@/hooks/useInput";
import useToast from "@/hooks/useToast";
import { registerStudent } from "@/lib/api/account";
import { getStudentEmailValidity, getPasswordValidity } from "@/lib/util";
import { AuthField } from "./AuthField";
import parseUnknownError from "@/lib/parse-unknown-error";

export function RegisterForm() {
  const toast = useToast();
  const emailInput = useInput({
    validators: [
      (val) =>
        getStudentEmailValidity(val)
          ? { type: "success" }
          : {
              type: "error",
              message:
                "Перевірте чи ваша пошта є у домені nure.ua та не містить невалідних символів",
            },
    ],
  });
  const emailInputRef = useRef<HTMLInputElement>(null);
  const passwordInput = useInput({
    validators: [
      (val) =>
        getPasswordValidity(val)
          ? { type: "success" }
          : {
              type: "error",
              message:
                "Пароль повинен бути від 8 до 33 символів серед яких: літери верхнього й нижнього регістру, хоча б одна цифра або спеціальний символ",
            },
    ],
  });
  const passwordInputRef = useRef<HTMLInputElement>(null);
  const formIsValid = emailInput.isValid && passwordInput.isValid;

  const registerMutation = useMutation(["register-student"], registerStudent, {
    onMutate: () => {
      toast.setCurrent("Перевіряємо дані...");
    },
    onSuccess: (_data) => {
      toast.success("Успіх! Перевірте вашу електронну пошту", true);
    },
    onError: (error: unknown) => {
      toast.error(parseUnknownError(error), true);
    },
  });

  const handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    emailInput.blur();
    passwordInput.blur();
    if (!formIsValid) {
      if (!emailInput.isValid) {
        emailInputRef.current!.focus();
      } else {
        passwordInputRef.current!.focus();
      }
      return;
    }
    registerMutation.mutate({
      email: emailInput.value,
      password: passwordInput.value,
    });
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit} id="register-form">
      <AuthField
        ref={emailInputRef}
        id="email"
        placeholder="Уведіть пошту"
        type="email"
        showError={emailInput.wasBlurred && emailInput.hasErrors}
        onChange={emailInput.change}
        onBlur={emailInput.blur}
        errorMessage="Перевірте чи ваша пошта є у домені nure.ua та не містить невалідних символів"
        label={"Пошта"}
      />
      <AuthField
        ref={passwordInputRef}
        id="password"
        placeholder="Уведіть пароль"
        type="password"
        showError={passwordInput.wasBlurred && passwordInput.hasErrors}
        onChange={passwordInput.change}
        onBlur={passwordInput.blur}
        errorMessage="Пароль повинен бути від 8 до 33 символів серед яких: літери верхнього й нижнього регістру, хоча б одна цифра або спеціальний символ"
        label="Пароль"
      />
      <button
        type="submit"
        disabled={!formIsValid || registerMutation.isLoading}
        className="flex w-full justify-center rounded-md border border-transparent bg-blue-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all ease-in-out duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Зареєструватися
      </button>
    </form>
  );
}
