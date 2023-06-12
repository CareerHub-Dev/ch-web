import { useInput } from "@/hooks/useInput";
import useToast from "@/hooks/useToast";
import { forgotPassword } from "@/lib/api/account";
import parseUnknownError from "@/lib/parse-unknown-error";
import { getEmailValidity } from "@/lib/util";
import { useMutation } from "@tanstack/react-query";
import { FormEventHandler, useRef } from "react";
import { AuthField } from "./AuthField";

export const ForgotPasswordForm = () => {
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
  const forgotPasswordMutation = useMutation(
    ["forgotPassword"],
    forgotPassword,
    {
      onMutate: () => {
        toast.setCurrent("Відправляємо листа...");
      },
      onSuccess: () => {
        toast.success("Перевірте вашу пошту", true);
      },
      onError: (e) => {
        toast.error(parseUnknownError(e), true);
      },
    }
  );
  const forgotPasswordMutationPassed = forgotPasswordMutation.isSuccess;

  const formSubmissionHandler: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    emailInput.blur();
    if (emailInput.isValid) {
      forgotPasswordMutation.mutate(emailInput.value);
    } else {
      emailInputRef.current!.focus();
    }
    return;
  };

  return (
    <form onSubmit={formSubmissionHandler} id="forgottenPasswrodForm">
      <div>
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
        {forgotPasswordMutationPassed ? (
          <p className="mt-4 text-base text-gray-900 text-center py-12">
            {"Перевірте пошту та перейдіть за посиланням"}
          </p>
        ) : (
          <button
            type="submit"
            disabled={forgotPasswordMutation.isLoading}
            className="mt-4 flex w-full justify-center rounded-md border border-transparent bg-blue-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all ease-in-out duration-200 disabled:opacity-50 disabled:cursor-wait"
          >
            {"Відправити лист"}
          </button>
        )}
      </div>
    </form>
  );
};
