import { useCvDataStore } from '@/context/cv-data-store';
import ItemSelection from '../../ui/ItemsSelection';
import { TEMPLATE_LANGUAGES } from '@/context/cv-data-store/cv';
import useJobPositionsQuery from '@/hooks/useJobPositionsQuery';
import LoadingJobPositions from '../LoadingJobPositions';

export default function Stage0() {
  const selectedTemplateLanguage = useCvDataStore(
    (store) => store.cvData.templateLanguage
  );
  const setTemplateLanguage = useCvDataStore((s) => s.changeTemplateLanguage);

  const selectedJobPosition = useCvDataStore(
    (store) => store.cvData.jobPosition
  );

  const setJobPosition = useCvDataStore((s) => s.changeJobPosition);

  const jobPositions = useJobPositionsQuery({
    onSuccess: (data) => {
      if (data.length > 0) {
        setJobPosition(data.at(0)!);
      }
    },
  });

  return (
    <div className="space-y-6 sm:space-y-5">
      <div>
        <h3 className="text-lg font-medium leading-6 text-gray-900">
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
          {selectedJobPosition && jobPositions.data ? (
            <ItemSelection
              items={jobPositions.data}
              selectedItem={selectedJobPosition}
              setSelected={setJobPosition}
              label="Бажана Посада"
            />
          ) : (
            <LoadingJobPositions />
          )}
        </div>
      </div>
    </div>
  );
}
