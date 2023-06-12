import { Background } from "@/components/layout/Background";
import { Footer } from "@/components/layout/Footer";
import classes from "@/styles/auth.module.scss";
import FormWrapper from "@/components/auth/FormWrapper";
import { AuthField } from "@/components/auth/forms/AuthField";
import { useRouter } from "next/router";
import { useRef } from "react";
import { useInput } from "@/hooks/useInput";
import { getPasswordValidity } from "@/lib/util";
import { useMutation } from "@tanstack/react-query";
import { resetPassword } from "@/lib/api/account";
import useToast from "@/hooks/useToast";
import parseUnknownError from "@/lib/parse-unknown-error";

export default function ResetPasswordPage() {
  const router = useRouter();
  const token = router.query.token;
  const toast = useToast();
  const passwordInputRef = useRef<HTMLInputElement>(null);
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

  const resetPasswordMutation = useMutation(["resetPassword"], resetPassword, {
    onMutate: () => {
      toast.setCurrent("Змінюємо пароль...");
    },
    onSuccess: () => {
      toast.success("Успіх! Можете авторизуватися", true);
      router.push("/auth/login");
    },
    onError: (e) => {
      toast.error(parseUnknownError(e));
    },
  });

  const handleSubmit = () => {
    passwordInput.blur();

    if (passwordInput.isValid) {
      resetPasswordMutation.mutate({
        password: passwordInput.value,
        token: token as string,
      });
    } else {
      passwordInputRef.current?.focus();
    }
  };

  return (
    <div className={classes.form}>
      <FormWrapper withRouting={false}>
        <form
          className="space-y-6"
          onSubmit={handleSubmit}
          id="reset-password-form"
        >
          <AuthField
            ref={passwordInputRef}
            id="password"
            type="password"
            showError={passwordInput.wasBlurred && passwordInput.hasErrors}
            onChange={passwordInput.change}
            onBlur={passwordInput.blur}
            errorMessage="Пароль повинен бути від 8 до 33 символів серед яких: літери верхнього й нижнього регістру, хоча б одна цифра або спеціальний символ"
            label="Пароль"
          />
          <button
            type="submit"
            className="flex w-full justify-center rounded-md border border-transparent bg-blue-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all ease-in-out duration-200 disabled:opacity-50 disabled:cursor-wait"
          >
            {"Змінити пароль"}
          </button>
        </form>
      </FormWrapper>
    </div>
  );
}

ResetPasswordPage.getLayout = (page: React.ReactElement) => {
  return (
    <>
      <main className="flex flex-col h-screen">
        <div className="grow flex justify-center py-20">{page}</div>
        <Footer className="shrink-0" />
      </main>
      <Background />
    </>
  );
};
