import { useInput } from "@/hooks/useInput";
import useToast from "@/hooks/useToast";
import useProtectedMutation from "@/hooks/useProtectedMutation";
import { useQueryClient } from "@tanstack/react-query";
import format from "date-fns/format";
import { updateStudentGeneralInfo } from "@/lib/api/student";
import FormInput from "@/components/ui/form/v2/FormInput";
import { isPhoneNumber } from "@/lib/phone";
import parseUnknownError from "@/lib/parse-unknown-error";
import ModalLoading from "@/components/ui/Modal/ModalLoading";

function GeneralInfo({ initialData }: { initialData: any }) {
  const toast = useToast();
  const queryClient = useQueryClient();
  const firstNameInput = useInput({
    initialValue: initialData?.firstName,
    validators: [valueIsNotEmpty],
  });
  const lastNameInput = useInput({
    initialValue: initialData?.lastName,
    validators: [valueIsNotEmpty],
  });
  const phoneInput = useInput({
    initialValue: initialData?.phone,
    validators: [
      (val) => {
        const withoutSpaces = val.replace(/\s/g, "");
        return withoutSpaces.length === 0 || isPhoneNumber(withoutSpaces)
          ? {
              type: "error",
              message:
                "Номер телефону має відповідати формату XХХ-ХХХ-ХХХХ (без коду країни) або бути відсутнім",
            }
          : { type: "success" };
      },
    ],
  });
  const initialBirthDate = initialData?.birthDate;
  const birthDateInput = useInput({
    initialValue: initialBirthDate
      ? format(new Date(initialBirthDate), "yyyy-MM-dd")
      : "",
  });

  const mutation = useProtectedMutation(
    ["updateSelfStudent"],
    updateStudentGeneralInfo,
    {
      onSuccess: () => {
        const currentData = queryClient.getQueryData(["selfStudent"]);
        const newData = {
          firstName: firstNameInput.value,
          lastName: lastNameInput.value,
          phone: phoneInput.value,
          birthDate:
            birthDateInput.value &&
            new Date(birthDateInput.value).toISOString(),
        };
        if (typeof currentData === "object") {
          queryClient.setQueryData(["selfStudent"], {
            ...currentData,
            ...newData,
          });
        } else {
          queryClient.invalidateQueries(["selfStudent"]);
        }
        firstNameInput.reset({ value: newData.firstName });
        lastNameInput.reset({ value: newData.lastName });
        phoneInput.reset({ value: newData.phone });
        birthDateInput.reset({ value: birthDateInput.value });
        toast.success("Зміни збережено");
      },
      onError: (error) => {
        toast.error(parseUnknownError(error));
      },
    }
  );

  const allInputs = [firstNameInput, lastNameInput, phoneInput, birthDateInput];
  const noInputTouched = allInputs.every((input) => !input.wasChanged);
  const someInputIsInvalid = allInputs.some((input) => !input.isValid);
  const someInputHasError = allInputs.some(
    (input) => input.wasBlurred && input.hasErrors
  );
  const cannotSubmit = someInputHasError || noInputTouched;

  const save = () => {
    if (someInputIsInvalid) {
      allInputs.forEach((input) => input.blur());
      return;
    }
    if (cannotSubmit) {
      return;
    }
    const birthDate = birthDateInput.value;
    const data = {
      firstName: firstNameInput.value,
      lastName: lastNameInput.value,
      phone: phoneInput.value.replace(/\s/g, "") || null,
      birthDate: birthDate ? new Date(birthDate).toISOString() : null,
      studentGroupId: initialData?.studentGroup?.id,
    };
    mutation.mutate(data);
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
      <form className="mt-4 py-4 md:px-4">
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
        <div className="mb-8">
          <label
            className="font-bold"
            htmlFor="birthDate"
          >{`Дата народження`}</label>
          <FormInput
            {...birthDateInput}
            type="date"
            id="birthDate"
            className="w-full p-2"
          />
        </div>
      </form>
      <div className="flex flex-row-reverse mt-4 mb-4">
        <button
          className={"btn-primary p-2 w-40 ml-2 bg-primaryBlue"}
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
}
export default GeneralInfo;

function valueIsNotEmpty(val: string) {
  return val.trim().length > 0
    ? ({ type: "success" } as const)
    : ({ type: "error", message: "Має бути хоча б один символ" } as const);
}
