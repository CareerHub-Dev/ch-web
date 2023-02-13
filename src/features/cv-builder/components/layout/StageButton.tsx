import {
  getStageCompletionStatus,
  getStageAccessibility,
  useCvDataStore,
  CV_EDITOR_STAGES,
} from "../../store/cv-data-store";
import cn from "classnames";

export default function StageButton({
  stage,
}: {
  stage: typeof CV_EDITOR_STAGES[number];
}) {
  const currentStageNumber = useCvDataStore((s) => s.currentStage);
  const stageStatus = useCvDataStore(getStageCompletionStatus(stage.id));
  const stageAccessibility = useCvDataStore(getStageAccessibility(stage.id));
  const goToStage = useCvDataStore((s) => s.goToStage);

  const colorStatus =
    currentStageNumber === stage.id
      ? "current"
      : stageAccessibility.status === "inaccessible"
      ? "disabled"
      : stageStatus;
  const colorClasses = getStageColorClasses(colorStatus);

  const handleClick = () => {
    goToStage(stage.id);
  };

  return (
    <li className="lg:flex-1 mb-4">
      <button
        type="button"
        onClick={handleClick}
        disabled={stageAccessibility.status === "inaccessible"}
        title={stageAccessibility.reason}
        className={cn(
          "text-left group flex flex-col border-l-4 py-2 pl-4 lg:border-l-0 lg:border-t-4 lg:pl-0 lg:pt-4 lg:pb-0 w-full transition-all ease-in-out duration-200",
          colorClasses.button
        )}
      >
        <span
          className={cn(
            "text-sm font-medium text-gray-500",
            colorClasses.title
          )}
        >
          {`${stage.id + 1}. ${stage.name}`}
        </span>
      </button>
    </li>
  );
}

function getStageColorClasses(
  stageStatus:
    | ReturnType<ReturnType<typeof getStageCompletionStatus>>
    | "current"
    | "disabled"
) {
  switch (stageStatus) {
    case "current":
      return { button: "border-blue-600", title: "group-hover:text-gray-700" };
    case "hasErrors":
      return {
        button: "border-red-600 hover:border-red-700",
        title: "group-hover:text-gray-700",
      };
    case "hasWarnings":
      return {
        button: "border-orange-600 hover:border-orange-700",
        title: "group-hover:text-gray-700",
      };
    case "complete":
      return {
        button: "border-green-600 hover:border-green-700",
        title: "group-hover:text-gray-700",
      };
    case "disabled":
      return { button: "border-gray-200 cursor-not-allowed" };
    default:
      return {
        button: "border-gray-200 hover:border-gray-300",
        title: "group-hover:text-gray-700",
      };
  }
}
