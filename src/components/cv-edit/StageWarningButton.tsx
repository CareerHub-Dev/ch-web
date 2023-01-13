import { CheckIcon } from '@heroicons/react/20/solid';
import { useCvUiStore } from '@/context/cv-ui-store';
import { type StageNumber } from '@/context/cv-ui-store/stages-slice';

export default function StageCompleteButton({
  stageName,
  stageNumber,
}: {
  stageNumber: StageNumber;
  stageName: string;
}) {
  const goToStage = useCvUiStore(s => s.goToStage);

  return (
    <>
      <div className="absolute inset-0 flex items-center" aria-hidden="true">
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
  );
}
