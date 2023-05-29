import { useInput } from "@/hooks/useInput";
import useSession from "@/hooks/useSession";
import useToast from "@/hooks/useToast";
import { LocalGateway } from "@/lib/api/account";
import { emailPattern, passwordPattern } from "@/lib/util";
import { useMutation } from "@tanstack/react-query";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useRef, type FormEventHandler } from "react";
import { AuthField } from "./AuthField";

const ModalLoading = dynamic(
  () => import("@/components/ui/Modal/ModalLoading"),
  {
    ssr: false,
  }
);

export const LoginForm = () => {
  const router = useRouter();
  const session = useSession();
  const toast = useToast();
  const emailInputRef = useRef<HTMLInputElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);
  const emailInput = useInput({
    validators: [
      (val) =>
        val.match(emailPattern)
          ? { type: "success" }
          : { type: "error", message: "Невалідна адреса" },
    ],
  });
  const passwordInput = useInput({
    validators: [
      (val) =>
        val.match(passwordPattern)
          ? { type: "success" }
          : { type: "error", message: "Невалідний пароль" },
    ],
  });
  const formInputsHaveErrors = emailInput.hasErrors || passwordInput.hasErrors;
  const authMutation = useMutation(["auth"], LocalGateway.authenticate, {
    onSuccess: (data) => {
      session.login(data);
      router.push("/me");
    },
    onError: (error: string) => {
      toast.error(error);
    },
  });

  const handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    emailInput.blur();
    passwordInput.blur();
    if (formInputsHaveErrors) {
      if (emailInput.hasErrors) {
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
    <form id="login-form" className="space-y-6" onSubmit={handleSubmit}>
      <ModalLoading show={authMutation.isLoading} />
      <AuthField
        label="Пошта"
        id="email"
        type="email"
        ref={emailInputRef}
        onChange={emailInput.change}
        onBlur={emailInput.blur}
        showError={emailInput.wasBlurred && emailInput.hasErrors}
        errorMessage={emailInput.errors.at(0)}
      />

      <AuthField
        label="Пароль"
        id="password"
        type="password"
        ref={passwordInputRef}
        onChange={passwordInput.change}
        onBlur={passwordInput.blur}
        showError={passwordInput.wasBlurred && passwordInput.hasErrors}
        errorMessage={passwordInput.errors.at(0)}
      />

      <div>
        <button
          type="submit"
          className="flex w-full justify-center rounded-md border border-transparent bg-blue-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all ease-in-out duration-200"
        >
          Увійти
        </button>
      </div>
    </form>
  );
};
