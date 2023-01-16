import { useCvUiStore } from '@/context/cv-ui-store';
import { type StageNumber } from '@/context/cv-ui-store/stages-slice';

export default function StageIncompleteButton({
  stageName,
  stageNumber,
}: {
  stageNumber: StageNumber;
  stageName: string;
}) {
  const goToStage = useCvUiStore((s) => s.goToStage);

  return (
    <>
      <div className="absolute inset-0 flex items-center" aria-hidden="true">
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
  );
}
