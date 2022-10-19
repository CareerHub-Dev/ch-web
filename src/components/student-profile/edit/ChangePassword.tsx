import useInput from '@/hooks/useInput/v3';
import useToast from '@/hooks/useToast';
import useAuth from '@/hooks/useAuth';
import { useBoolean } from 'usehooks-ts';
import { useMutation } from '@tanstack/react-query';
import parseUnknownError from '@/lib/parse-unknown-error';
import ModalLoading from '@/components/ui/Modal/ModalLoading';
import FormInput from '@/components/ui/form/v2/FormInput';
import Link from 'next/link';

const ChangePassword = () => {
  const toast = useToast();
  const auth = useAuth();
  const accessToken = auth.session?.jwtToken;

  const oldPasswordInput = useInput();
  const oldPasswordIsVisible = useBoolean(false);
  const newPasswordInput = useInput({
    validators: [
      {
        validate: (value) => value !== oldPasswordInput.value,
        message: 'Новий пароль не повинен співпадати зі старим',
      },
    ],
  });
  const newPasswordIsVisible = useBoolean(false);
  const mutation = useMutation(['changePassword'], async () => true, {
    onSuccess: () => {
      toast.success('Пароль успішно змінено');
    },
    onError: (error) => {
      toast.error(parseUnknownError(error));
    },
  });

  const cannotSubmit = oldPasswordInput.hasError || newPasswordInput.hasError;

  const save = async () => {
    oldPasswordInput.blur();
    newPasswordInput.blur();

    if (oldPasswordInput.hasError || newPasswordInput.hasError) {
      return;
    }
    const oldPassword = oldPasswordInput.value;
    const newPassword = newPasswordInput.value;
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
            type={oldPasswordIsVisible.value ? 'text' : 'password'}
            className="w-full p-2"
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
            type={newPasswordIsVisible.value ? 'text' : 'password'}
            className="w-full p-2"
            id="newPassword"
          />
        </div>
      </form>
      <div className="flex flex-row-reverse mt-4 mb-40">
        <button
          className={'btn-primary p-2 w-40 ml-2 bg-primaryBlue'}
          onClick={save}
          disabled={cannotSubmit}
        >
          Оновити пароль
        </button>
        <Link href="/auth/login" passHref>
          <a className="block text-center btn-primary p-2 w-40">{`Я забув пароль`}</a>
        </Link>
      </div>
    </>
  );
};
export default ChangePassword;
