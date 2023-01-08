import Stage0 from './stages/Stage0';
import Stage1 from './stages/Stage1';
import Stage2 from './stages/Stage2';
import Stage3 from './stages/Stage3';
import Stage4 from './stages/Stage4';
import Stage5 from './stages/Stage5';
import Stage6 from './stages/Stage6';
import Stage7 from './stages/Stage7';
import { useCvUiStore } from '@/context/cv-ui-store';

export default function StageView() {
  const currentStage = useCvUiStore((s) => s.currentStage);

  const StageToRender =
    [Stage0, Stage1, Stage2, Stage3, Stage4, Stage5, Stage6, Stage7].at(
      currentStage
    ) || Stage0;

  return <StageToRender />;
}
