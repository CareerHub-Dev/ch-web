import { useCvUiStore } from "../store/cv-ui-store";
import { type StageNumber } from "../store/cv-ui-store/stages-slice";

export default function StageCurrentButton({
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
  );
}
