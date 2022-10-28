import MarkdownEditor from '@/components/ui/MarkdownEditor';
import { UseEditorResult } from '@/hooks/useEditor';

import classes from './EditorWrapper.module.scss';

const EditorWrapper = ({
  label,
  editor,
  validationMessage,
}: {
  id: string;
  label: string;
  editor: UseEditorResult;
  validationMessage: string;
}) => {
  return (
    <div className={classes['editor-wrapper']}>
      {label && <label className={classes['editor-label']}>{label}</label>}

      <MarkdownEditor editor={editor} />

      {editor.hasError && (
        <p className={classes.validation}>{validationMessage}</p>
      )}
    </div>
  );
};

export default EditorWrapper;
