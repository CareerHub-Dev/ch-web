import AssistanceAlert from '../AssistantAlert';
import { useCvDataStore } from '@/context/cv-data-store';
import { TEMPLATE_LANGUAGES } from '@/context/cv-data-store/cv';
import { useCvUiStore } from '@/context/cv-ui-store';
import ItemSelection from '../../ui/ItemsSelection';

export default function Stage0() {
  const selectedTemplateLanguage = useCvDataStore(
    (store) => store.cvData.templateLanguage
  );
  const isAssistEnabled = useCvUiStore((s) => s.isAssistanceEnabled);
  const setTemplateLanguage = useCvDataStore((s) => s.changeTemplateLanguage);

  const selectedJobPosition = useCvDataStore(
    (store) => store.cvData.jobPosition
  ) ?? { id: '0', name: 'Оберіть опцію' };

  const setJobPosition = useCvDataStore((s) => s.changeJobPosition);

  return (
    <>
      <div className="space-y-6 sm:space-y-5">
        <div>
          <h3 className="text-xl font-medium leading-6 text-gray-900">
            Загальна інформація
          </h3>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">
            Загальна інформація про тип роботи та вибір мови, на якій
            створюватиметься резюме
          </p>
        </div>

        <div className="space-y-6 sm:space-y-5 divide-y divide-gray-200">
          <div className="sm:grid sm:grid-cols-2 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
            <ItemSelection
              items={TEMPLATE_LANGUAGES}
              selectedItem={selectedTemplateLanguage}
              setSelected={setTemplateLanguage}
              label="Мова шаблону"
            />
          </div>
          <div className="sm:grid sm:grid-cols-2 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
            <ItemSelection
              items={MOCK_JOB_POSITIONS}
              selectedItem={selectedJobPosition}
              setSelected={setJobPosition}
              label="Бажана Посада"
            />
          </div>
        </div>
      </div>
      {isAssistEnabled && ['Dev', 'QA'].includes(selectedJobPosition.name) && (
        <div className="mt-6">
          <AssistanceAlert
            title='Мова шаблону'
            type={selectedTemplateLanguage.id === 'EN' ? 'positive' : 'info'}
          >
            <p>
              У сфері IT всюди використовується англійська мова, тому у якості
              мови шаблону краще обрати саме її.
            </p>
          </AssistanceAlert>
        </div>
      )}
    </>
  );
}

const MOCK_JOB_POSITIONS = [
  { id: '1', name: 'Dev' },
  { id: '2', name: 'QA' },
  { id: '3', name: 'Devops' },
];
