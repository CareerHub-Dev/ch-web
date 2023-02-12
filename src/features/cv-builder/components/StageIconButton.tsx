import { type ReactNode } from "react";
import { useCvUiStore } from "../store/cv-ui-store";
import { type StageNumber } from "../store/cv-ui-store/stages-slice";

export default function StageIconButton({
  stageName,
  stageNumber,
  icon,
}: {
  stageNumber: StageNumber;
  stageName: string;
  icon: ReactNode;
}) {
  const goToStage = useCvUiStore((s) => s.goToStage);

  return (
    <>
      <div className="absolute inset-0 flex items-center" aria-hidden="true">
        <div className="h-0.5 w-full bg-gray-200" />
      </div>
      <a
        onClick={() => goToStage(stageNumber)}
        className="relative flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 hover:bg-blue-900"
      >
        {icon}
        <span className="sr-only">{stageName}</span>
      </a>
    </>
  );
}
