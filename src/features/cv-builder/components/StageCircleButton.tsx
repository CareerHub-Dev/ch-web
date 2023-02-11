import {
  getStageCompletionStatus,
  StageCompletionStatus,
  useCvDataStore,
} from '../store/cv-data-store';
import { useCvUiStore } from '../store/cv-ui-store';
import {
  CV_EDITOR_STAGES,
  type StageNumber,
} from '../store/cv-ui-store/stages-slice';
import {
  CheckIcon,
  ExclamationTriangleIcon,
  XMarkIcon,
} from '@heroicons/react/20/solid';
import cn from 'classnames';
import StageCurrentButton from './StageCurrentButton';
import StageIncompleteButton from './StageIncompleteButton';
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
  const stageStatus = useCvDataStore(getStageCompletionStatus(stageNumber));

  return (
    <li
      className={cn(
        stageNumber !== lastStageNumber && 'pr-8 sm:pr-12',
        'relative cursor-pointer'
      )}
    >
      {stageNumber === currentStageNumber ? (
        <StageCurrentButton stageName={stageName} stageNumber={stageNumber} />
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
    case 'incomplete':
      return <StageIncompleteButton {...props} />;
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
