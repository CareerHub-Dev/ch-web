import { useState } from 'react';
import { EditorState, ContentState } from 'draft-js';

const createEditorState = (text?: string) => {
  const initialText = text || '';
  return EditorState.createWithContent(
    ContentState.createFromText(initialText)
  );
};

const useEditor = (initialText?: string) => {
  const [editorState, setEditorState] = useState(
    createEditorState(initialText)
  );
  const [editorIsTouched, setEditorIsTouched] = useState(false);
  const content = editorState.getCurrentContent();
  const contentIsValid = content.hasText();
  const editorInputIsInvalid = !contentIsValid && editorIsTouched;

  const inputBlurHandler = () => {
    setEditorIsTouched(true);
  };

  const reset = () => {
    setEditorState(createEditorState());
    setEditorIsTouched(false);
  };

  return {
    editorState: {
      state: editorState,
      setState: setEditorState,
    },
    isValid: contentIsValid,
    isInputInvalid: editorInputIsInvalid,
    content: content,
    inputBlurHandler,
    reset,
  };
};

export default useEditor;
