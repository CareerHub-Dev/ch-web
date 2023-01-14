import {
  getStageCompletionStatus,
  StageCompletionStatus,
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
import StageIconButton from './StageIconButton';

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
      {stageNumber === currentStageNumber ? (
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
        <StageButtonComponentFromStatus
          stageStatus={stageStatus}
          stageNumber={stageNumber}
          stageName={stageName}
        />
      )}
    </li>
  );
}

function StageButtonComponentFromStatus(props: {
  stageStatus: StageCompletionStatus;
  stageNumber: StageNumber;
  stageName: string;
}) {
  const iconProps = {
    className: 'h-5 w-5 text-white',
    'aria-hidden': true,
  };

  switch (props.stageStatus) {
    case 'complete':
      return <StageIconButton {...props} icon={<CheckIcon {...iconProps} />} />;
    case 'hasErrors':
      return <StageIconButton {...props} icon={<XMarkIcon {...iconProps} />} />;
    case 'hasWarnings':
      return (
        <StageIconButton
          {...props}
          icon={<ExclamationTriangleIcon {...iconProps} />}
        />
      );
    default:
      return null;
  }
}
