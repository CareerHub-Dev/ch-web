import { CV_EDITOR_STAGES } from "../store/cv-ui-store/stages-slice";
import StageCircleButton from "./StageCircleButton";

export default function StageCircleButtons() {
  return (
    <nav aria-label="Progress" className="mx-auto w-full mb-12">
      <ol role="list" className="flex items-center justify-center align-middle">
        {CV_EDITOR_STAGES.map((stage) => (
          <StageCircleButton
            stageNumber={stage.id}
            stageName={stage.name}
            key={stage.id}
          />
        ))}
      </ol>
    </nav>
  );
}
