import ValidatedInput from "@/components/ui/ValidatedInput";
import {
  getFirstNameActions,
  getLastNameActions,
  useCvDataStore,
} from "../../../store/cv-data-store";
import { useCvAssistanceStore } from "@/features/cv-builder/store/cv-assistance-store";
import useSelfStudentQuery from "@/hooks/useStudentSelfQuery";
import Stage1Tips from "./Stage1Tips";
import LoadingInput from "../../LoadingInput";

export default function Stage1() {
  const isAssistEnabled = useCvAssistanceStore((s) => s.isAssistanceEnabled);
  const firstName = useCvDataStore((s) => s.cvData.firstName);
  const lastName = useCvDataStore((s) => s.cvData.lastName);
  const firstNameActions = useCvDataStore(getFirstNameActions);
  const lastNameActions = useCvDataStore(getLastNameActions);
  const { isLoading } = useSelfStudentQuery({
    onSuccess: (data) => {
      firstNameActions.force(data.firstName);
      lastNameActions.force(data.lastName);
    },
    retry: false,
  });

  return (
    <>
      <div className="space-y-6 sm:space-y-5">
        <div>
          <h3 className="text-xl font-medium leading-6 text-gray-900">
            {"Ім'я та приізвище"}
          </h3>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">
            {"Ім'я та прізвище, які відображатимуться у резюме"}
          </p>
        </div>

        <div className="space-y-6 sm:space-y-5 divide-y divide-gray-200">
          <div className="sm:grid sm:grid-cols-2 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
            {isLoading ? (
              <LoadingInput label="Ім'я" />
            ) : (
              <ValidatedInput
                label="Ім'я"
                id="firstName"
                {...firstName}
                onChange={firstNameActions.change}
                onBlur={firstNameActions.blur}
              />
            )}
          </div>
          <div className="sm:grid sm:grid-cols-2 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
            {isLoading ? (
              <LoadingInput label="Прізвище" />
            ) : (
              <ValidatedInput
                label="Прізвище"
                id="lastName"
                {...lastName}
                onChange={lastNameActions.change}
                onBlur={lastNameActions.blur}
              />
            )}
          </div>
        </div>
      </div>

      {isAssistEnabled ? (
        <div className="mt-6">
          <Stage1Tips />
        </div>
      ) : null}
    </>
  );
}
