import { useCvDataStore } from '../store/cv-data-store';
import { CalendarIcon } from '@heroicons/react/24/outline';
import { CvActionsButton } from './CvActionsButton';

export function CvBuilderHeading({ lastEdited }: { lastEdited?: string }) {
  const title = useCvDataStore((s) => s.cvData.title.value) || 'Без назви';

  return (
    <div className="flex flex-1 items-center justify-between rounded-r-md border-b border-gray-200 bg-white mb-5">
      <div className="flex-1 truncate py-2 text-sm">
        <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
          {title}
        </h2>
        {!!lastEdited ? (
          <div className="mt-1 flex flex-col sm:mt-0 sm:flex-row sm:flex-wrap sm:space-x-6">
            <div className="mt-2 flex items-center text-sm text-gray-500">
              <CalendarIcon
                className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
                aria-hidden="true"
              />
              {`Останнє редагування: ${lastEdited}`}
            </div>
          </div>
        ) : null}
      </div>
      <div className="flex-shrink-0">
        <CvActionsButton />
      </div>
    </div>
  );
}
