import { CV_EDITOR_STAGES } from '../../store/cv-ui-store/stages-slice';
import StageButton from './StageButton';

export default function StageCircleButtons() {
  return (
    <nav aria-label="Progress">
      <ol
        role="list"
        className="space-y-4 lg:flex lg:space-y-0 lg:space-x-2 mb-4"
      >
        {CV_EDITOR_STAGES.map((stage) => (
          <StageButton stage={stage} key={stage.id} />
        ))}
      </ol>
    </nav>
  );
}
