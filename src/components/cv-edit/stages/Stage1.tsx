import AssistanceAlert from '../AssistantAlert';
import ValidatedInput from '@/components/ui/ValidatedInput';
import { useCvDataStore } from '@/context/cv-data-store';
import { useCvUiStore } from '@/context/cv-ui-store';

export default function Stage1() {
  const isAssistEnabled = useCvUiStore((s) => s.isAssistanceEnabled);
  const jobPosition = useCvDataStore((s) => s.cvData.jobPosition?.name) ?? '';
  const firstName = useCvDataStore((s) => s.cvData.firstName);
  const lastName = useCvDataStore((s) => s.cvData.lastName);
  const changeFirstName = useCvDataStore((s) => s.changeFirstName);
  const changeLastName = useCvDataStore((s) => s.changeLastName);

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

      {isAssistEnabled && ['Dev', 'QA'].includes(jobPosition) && (
        <div className="mt-6">
          <AssistanceAlert title="Обрано англійську мову">
            <p>
              В ІТ-сфері всюди використовується англійська, тому краще
              заповнювати резюме на ньому. Давай почнемо з імені та прізвища
            </p>
          </AssistanceAlert>
        </div>
      )}
    </>
  );
}
