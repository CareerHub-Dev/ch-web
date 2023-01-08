import LoadingSpinner from '@/components/ui/LoadingSpinner';
import ValidatedInput from '@/components/ui/ValidatedInput';
import { useCvDataStore } from '@/context/cv-data-store';
import useSelfStudentQuery from '@/hooks/useStudentSelfQuery';

export default function Stage1() {
  const firstName = useCvDataStore((s) => s.cvData.firstName);
  const lastName = useCvDataStore((s) => s.cvData.lastName);
  const changeFirstName = useCvDataStore((s) => s.changeFirstName);
  const changeLastName = useCvDataStore((s) => s.changeLastName);

  const { isLoading: studentDataIsLoading } = useSelfStudentQuery({
    onSuccess: (data) => {
      changeFirstName(data.firstName);
      changeLastName(data.lastName);
    },
  });
  if (studentDataIsLoading) {
    return (
      <div className="text-center p-2">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="space-y-6 sm:space-y-5">
      <div>
        <h3 className="text-xl font-medium leading-6 text-gray-900">
          {"Ім'я та приізвище"}
        </h3>
        <p className="mt-1 max-w-2xl text-sm text-gray-500">
          {"Ім'я та прізвище, які відображатимуться у резюме"}
        </p>
      </div>

      <div className="space-y-6 sm:space-y-5">
        <div className="sm:grid sm:grid-cols-2 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
          <ValidatedInput
            label="Ім'я"
            id="firstName"
            {...firstName}
            onChange={changeFirstName}
          />
          <ValidatedInput
            label="Прізвище"
            id="lastName"
            {...lastName}
            onChange={changeLastName}
          />
        </div>
      </div>
    </div>
  );
}
