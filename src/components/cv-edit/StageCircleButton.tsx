import {
  getStageCompletionStatus,
  useCvDataStore,
} from '@/context/cv-data-store';
import { useCvUiStore } from '@/context/cv-ui-store';
import {
  CV_EDITOR_STAGES,
  type StageNumber,
} from '@/context/cv-ui-store/stages-slice';
import {
  CheckIcon,
  ExclamationTriangleIcon,
  XMarkIcon,
} from '@heroicons/react/20/solid';
import cn from 'classnames';

export default function StageCircleButton({
  stageNumber,
  stageName,
}: {
  stageNumber: StageNumber;
  stageName: string;
}) {
  const lastStageNumber = CV_EDITOR_STAGES.at(-1)!;
  const currentStageNumber = useCvUiStore((s) => s.currentStage);
  const goToStage = useCvUiStore((s) => s.goToStage);
  const stageStatus = useCvDataStore(getStageCompletionStatus(stageNumber));

  return (
    <li
      className={cn(
        stageNumber !== lastStageNumber - 1 && 'pr-8 sm:pr-12',
        'relative'
      )}
    >
      {stageStatus === 'complete' ? (
        <>
          <div
            className="absolute inset-0 flex items-center"
            aria-hidden="true"
          >
            <div className="h-0.5 w-full bg-blue-600" />
          </div>
          <a
            onClick={() => goToStage(stageNumber)}
            className="relative flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 hover:bg-blue-900"
          >
            <CheckIcon className="h-5 w-5 text-white" aria-hidden="true" />
            <span className="sr-only">{stageName}</span>
          </a>
        </>
      ) : stageNumber === currentStageNumber ? (
        <>
          <div
            className="absolute inset-0 flex items-center"
            aria-hidden="true"
          >
            <div className="h-0.5 w-full bg-gray-200" />
          </div>
          <a
            onClick={() => goToStage(stageNumber)}
            className="relative flex h-8 w-8 items-center justify-center rounded-full border-2 border-blue-600 bg-white"
            aria-current="step"
          >
            <span
              className="h-2.5 w-2.5 rounded-full bg-blue-600"
              aria-hidden="true"
            />
            <span className="sr-only">{stageName}</span>
          </a>
        </>
      ) : (
        <>
          <div
            className="absolute inset-0 flex items-center"
            aria-hidden="true"
          >
            <div className="h-0.5 w-full bg-gray-200" />
          </div>
          <a
            onClick={() => goToStage(stageNumber)}
            className="group relative flex h-8 w-8 items-center justify-center rounded-full border-2 border-gray-300 bg-white hover:border-gray-400"
          >
            <span
              className="h-2.5 w-2.5 rounded-full bg-transparent group-hover:bg-gray-300"
              aria-hidden="true"
            />
            <span className="sr-only">{stageName}</span>
          </a>
        </>
      )}
    </li>
  );
}
