import { UseEditorResult } from '@/hooks/useEditor';
import EditorWrapper from './EditorWrapper';
import classes from './EditorsList.module.scss';

const EditorsList = ({
  editors,
}: {
  editors: Array<
    UseEditorResult & {
      id: string;
      label: string;
      validationMessage: string;
    }
  >;
}) => {
  const areThereErrors = editors.some((e) => e.hasError);

  return (
    <div id="editorsSection" className={classes['editors-section']}>
      {editors.map((editor) => (
        <EditorWrapper
          id={editor.id}
          key={editor.id}
          label={editor.label}
          editor={editor}
          validationMessage={editor.validationMessage}
        />
      ))}
      {areThereErrors && (
        <p className={classes.validation}>{'Заповнено не всі частини опису'}</p>
      )}
    </div>
  );
};

export default EditorsList;
