import { EditorState } from 'draft-js';
import StyleButton from './StyleButton';

const BlockStyleControls = ({
  editorState,
  onToggle,
  blockTypes,
}: {
  editorState: EditorState;
  onToggle: AnyFn;
  blockTypes: Array<{
    label: string;
    style: string;
  }>;
}) => {
  const selection = editorState.getSelection();
  const blockType = editorState
    .getCurrentContent()
    .getBlockForKey(selection.getStartKey())
    .getType();

  return (
    <div className="RichEditor-controls">
      {blockTypes.map((type) => (
        <StyleButton
          key={type.label}
          active={type.style === blockType}
          label={type.label}
          onToggle={onToggle}
          style={type.style}
        />
      ))}
    </div>
  );
};
export default BlockStyleControls;
