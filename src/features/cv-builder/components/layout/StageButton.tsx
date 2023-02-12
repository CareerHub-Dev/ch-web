import { useCvUiStore } from "../../store/cv-ui-store";
import {
  getStageCompletionStatus,
  useCvDataStore,
} from "../../store/cv-data-store";
import { CV_EDITOR_STAGES } from "../../store/cv-ui-store/stages-slice";
import cn from "classnames";

export default function StageButton({
  stage,
}: {
  stage: typeof CV_EDITOR_STAGES[number];
}) {
  const currentStageNumber = useCvUiStore((s) => s.currentStage);
  const stageStatus = useCvDataStore(getStageCompletionStatus(stage.id));
  const goToStage = useCvUiStore((s) => s.goToStage);

  const colorStatus = currentStageNumber === stage.id ? "current" : stageStatus;
  const colorClass = getStageColorClass(colorStatus);

  const handleClick = () => {
    goToStage(stage.id);
  };

  return (
    <li className="lg:flex-1 mb-4">
      <button
        type="button"
        onClick={handleClick}
        className={cn(
          "text-left group flex flex-col border-l-4 py-2 pl-4 lg:border-l-0 lg:border-t-4 lg:pl-0 lg:pt-4 lg:pb-0 w-full transition-all ease-in-out duration-200",
          colorClass
        )}
      >
        <span className="text-sm font-medium text-gray-500 group-hover:text-gray-700">
          {`${stage.id + 1}. ${stage.name}`}
        </span>
      </button>
    </li>
  );
}

function getStageColorClass(
  stageStatus:
    | ReturnType<ReturnType<typeof getStageCompletionStatus>>
    | "current"
) {
  switch (stageStatus) {
    case "current":
      return "border-blue-600";
    case "hasErrors":
      return "border-red-600 hover:border-red-700";
    case "hasWarnings":
      return "border-orange-600 hover:border-orange-700";
    case "complete":
      return "border-green-600 hover:border-green-700";
    default:
      return "border-gray-200 hover:border-gray-300";
  }
}
