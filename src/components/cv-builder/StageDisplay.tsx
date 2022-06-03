import Stage0 from './stages/Stage0';
import Stage1 from './stages/Stage1';
import Stage2 from './stages/Stage2';
import Stage3 from './stages/Stage3';
import Stage4 from './stages/Stage4';
import Stage5 from './stages/Stage5';
import Stage6 from './stages/Stage6';
import Stage7 from './stages/Stage7';
import CompletionStage from './stages/CompletionStage';

// TODO: extract Card compoent with stage heading h1 to this component
const StageDisplay: React.FC<{ stage: number }> = ({ stage }) => {
  switch (stage) {
    case 0:
      return <Stage0 />;
    case 1:
      return <Stage1 />;
    case 2:
      return <Stage2 />;
    case 3:
      return <Stage3 />;
    case 4:
      return <Stage4 />;
    case 5:
      return <Stage5 />;
    case 6:
      return <Stage6 />;
    case 7:
      return <Stage7 />;
    case 8:
      return <CompletionStage />;
    default:
      return <Stage0 />;
  }
};
export default StageDisplay;
