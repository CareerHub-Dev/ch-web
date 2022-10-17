import useInput from '@/hooks/useInput/v3';
import useAuth from '@/hooks/useAuth';
import { useMutation } from '@tanstack/react-query';
import FormInput from '@/components/ui/form/v2/FormInput';

import cn from 'classnames';

const controlClassName = 'mb-8';

const GeneralInfo = ({ initialData }: { initialData: any }) => {
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
    initialValue: initialData.phone,
  });

  const allInputs = [firstNameInput, lastNameInput, phoneInput];
  const someInputHasError = allInputs.some((input) => input.hasError);
  const someInputIsTouched = allInputs.some((input) => input.isTouched);
  const cannotSubmit = someInputHasError || !someInputIsTouched;

  const cancel = () => {
    allInputs.forEach((input) => input.reset());
  };

  return (
    <>
      <h2 className="text-2xl">Загальна інформація</h2>
      <p className="text-sm text-darkGray mb-2">
        Зміна імені, прізвища, номеру телефону та дати народження
      </p>
      <hr />
      <form className="mt-4 p-4">
        <div className={controlClassName}>
          <label htmlFor="firstName" className="font-bold">{`Ім'я`}</label>
          <FormInput
            {...firstNameInput}
            className="w-full p-2"
            id="firstName"
          />
        </div>
        <div className={controlClassName}>
          <label className="font-bold" htmlFor="lastName">{`Прізвище`}</label>
          <FormInput {...lastNameInput} className="w-full p-2" id="lastName" />
        </div>
        <div className={controlClassName}>
          <label className="font-bold" htmlFor="phone">{`Телефон`}</label>
          <FormInput
            {...phoneInput}
            className="w-full p-2"
            type="phone"
            id="phone"
          />
        </div>
        {/* <div className={controlClassName}>
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
          onClick={() => null}
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
