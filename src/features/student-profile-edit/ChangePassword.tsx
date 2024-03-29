import { useInput } from "@/hooks/useInput";
import useToast from "@/hooks/useToast";
import useProtectedMutation from "@/hooks/useProtectedMutation";
import { useBoolean } from "usehooks-ts";
import { changePassword } from "@/lib/api/account";
import parseUnknownError from "@/lib/parse-unknown-error";
import ModalLoading from "@/components/ui/Modal/ModalLoading";
import FormInput from "@/components/ui/form/v2/FormInput";
import Link from "next/link";

function ChangePassword() {
  const toast = useToast();
  const oldPasswordInput = useInput();
  const oldPasswordIsVisible = useBoolean(false);
  const newPasswordInput = useInput({
    validators: [
      (val) =>
        val === oldPasswordInput.value
          ? { type: "success" }
          : {
              type: "error",
              message: "Новий пароль не повинен співпадати зі старим",
            },
    ],
  });
  const repeatedNewPasswordInput = useInput();
  const newPasswordIsVisible = useBoolean(false);

  const mutation = useProtectedMutation(["changePassword"], changePassword, {
    onSuccess: () => {
      toast.success("Пароль успішно змінено");
    },
    onError: (error) => {
      toast.error(parseUnknownError(error));
    },
  });

  const cannotSubmit = oldPasswordInput.hasErrors || newPasswordInput.hasErrors;

  const save = () => {
    oldPasswordInput.blur();
    newPasswordInput.blur();
    if ([oldPasswordInput, newPasswordInput].some((input) => !input.isValid)) {
      return;
    }
    const oldPassword = oldPasswordInput.value;
    const newPassword = newPasswordInput.value;
    mutation.mutate({ oldPassword, newPassword });
  };

  return (
    <>
      {mutation.isLoading && <ModalLoading />}
      <h2 className="text-2xl">Зміна паролю</h2>
      <p className="text-sm text-darkGray mb-2">
        Зміна паролю не вплине на інші пристрої, з яких ви входили в систему
      </p>
      <hr />
      <form className="mt-4 py-4 md:px-4">
        <div className="mb-8">
          <label
            htmlFor="oldPassword"
            className="font-bold"
          >{`Старий пароль`}</label>
          <FormInput
            {...oldPasswordInput}
            type={oldPasswordIsVisible.value ? "text" : "password"}
            className="w-full p-2"
            autoComplete="off"
            id="oldPassword"
          />
        </div>
        <div className="mb-8">
          <label
            htmlFor="newPassword"
            className="font-bold"
          >{`Новий пароль`}</label>
          <FormInput
            {...newPasswordInput}
            type={newPasswordIsVisible.value ? "text" : "password"}
            className="w-full p-2"
            id="newPassword"
            autoComplete="off"
          />
        </div>
        <div className="mb-8">
          <label
            htmlFor="repeatedNewPassword"
            className="font-bold"
          >{`Повторіть Новий пароль`}</label>
          <FormInput
            {...repeatedNewPasswordInput}
            type={newPasswordIsVisible.value ? "text" : "password"}
            className="w-full p-2"
            id="repeatedNewPassword"
            autoComplete="off"
          />
        </div>
      </form>
      <div className="flex flex-row-reverse mt-4 mb-4">
        <button
          className="btn-primary p-2 w-40 ml-2 bg-primaryBlue"
          onClick={save}
          disabled={cannotSubmit || mutation.isLoading}
        >
          Оновити пароль
        </button>
        <Link
          href="/auth/login"
          className="block text-center btn-primary p-2 w-40"
        >
          Я забув пароль
        </Link>
      </div>
    </>
  );
}
export default ChangePassword;
