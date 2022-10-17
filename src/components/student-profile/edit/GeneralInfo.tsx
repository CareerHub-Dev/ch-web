import useInput from '@/hooks/useInput/v3';
import useAuth from '@/hooks/useAuth';
import useToast from '@/hooks/useToast';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateStudentGeneralInfo } from '@/lib/api/student';
import FormInput from '@/components/ui/form/v2/FormInput';
import { isPhoneNumber } from '@/lib/regex';
import ModalLoading from '@/components/ui/Modal/ModalLoading';

import cn from 'classnames';

const GeneralInfo = ({ initialData }: { initialData: any }) => {
  const auth = useAuth();
  const toast = useToast();
  const queryClient = useQueryClient();
  const firstNameInput = useInput({
    initialValue: initialData.firstName,
    validators: [
      {
        validate: (value) => value.length > 0,
        message: 'Має бути хоча б один символ',
      },
    ],
  });
  const lastNameInput = useInput({
    initialValue: initialData.lastName,
    validators: [
      {
        validate: (value) => value.length > 0,
        message: 'Має бути хоча б один символ',
      },
    ],
  });
  const phoneInput = useInput({
    initialValue: initialData.phone ?? '',
    validators: [
      {
        validate: (value) => {
          const withoutSpaces = value.replace(/\s/g, '');
          return withoutSpaces.length === 0 || isPhoneNumber(withoutSpaces);
        },
        message:
          'Номер телефону має відповідати формату XХХ-ХХХ-ХХХХ (без коду країни) або бути відсутнім',
      },
    ],
  });

  const mutation = useMutation(
    ['updateSelfStudent'],
    updateStudentGeneralInfo,
    {
      onSuccess: (data) => {
        const currentData = queryClient.getQueryData(['selfStudent']);
        if (typeof currentData === 'object' && typeof data === 'object') {
          queryClient.setQueryData(['selfStudent'], {
            ...currentData,
            ...data,
          });
        } else {
          queryClient.invalidateQueries(['selfStudent']);
        }
        toast.success('Зміни збережено');
      },
      onError: (error) => {
        let msg = 'Невідома помилка';
        if (error instanceof Error) {
          msg = error.message;
        } else if (typeof error === 'string') {
          msg = error;
        }
        toast.error(msg);
      },
    }
  );

  const accessToken = auth.session?.jwtToken;
  const allInputs = [firstNameInput, lastNameInput, phoneInput];
  const someInputIsInvalid = allInputs.some((input) => !input.isValid);
  const someInputHasError = allInputs.some((input) => input.hasError);
  const cannotSubmit = someInputHasError;

  const save = async () => {
    if (someInputIsInvalid) {
      allInputs.forEach((input) => input.blur());
      return;
    }
    if (cannotSubmit) {
      return;
    }
    const data = {
      accessToken,
      firstName: firstNameInput.value,
      lastName: lastNameInput.value,
      phone: phoneInput.value.replace(/\s/g, ''),
      studentGroupId: initialData?.studentGroup?.id,
    };
    await mutation.mutateAsync(data);
  };

  const cancel = () => {
    allInputs.forEach((input) => input.reset());
  };

  return (
    <>
      {mutation.isLoading && <ModalLoading />}
      <h2 className="text-2xl">Загальна інформація</h2>
      <p className="text-sm text-darkGray mb-2">
        Зміна імені, прізвища, номеру телефону та дати народження
      </p>
      <hr />
      <form className="mt-4 p-4">
        <div className="mb-8">
          <label htmlFor="firstName" className="font-bold">{`Ім'я`}</label>
          <FormInput
            {...firstNameInput}
            className="w-full p-2"
            id="firstName"
          />
        </div>
        <div className="mb-8">
          <label className="font-bold" htmlFor="lastName">{`Прізвище`}</label>
          <FormInput {...lastNameInput} className="w-full p-2" id="lastName" />
        </div>
        <div className="mb-8">
          <label className="font-bold" htmlFor="phone">{`Телефон`}</label>
          <FormInput
            {...phoneInput}
            className="w-full p-2"
            type="tel"
            id="phone"
          />
        </div>
        {/* <div className='mb-8'>
          <label
            className="font-bold"
            htmlFor="birthDate"
          >{`Дата народження`}</label>
          <input type="date" id="birthDate" className={inputClassName} />
        </div> */}
      </form>
      <div className="flex flex-row-reverse mt-4 mb-40">
        <button
          className={cn('btn-primary p-2 w-40 ml-2 bg-primaryBlue')}
          onClick={save}
          disabled={cannotSubmit}
        >
          Зберегти
        </button>
        <button className="btn-primary p-2 w-40" onClick={cancel}>
          Скасувати
        </button>
      </div>
    </>
  );
};
export default GeneralInfo;
