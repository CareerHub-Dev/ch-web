import { useState } from 'react';
import { EditorState, ContentState, convertToRaw } from 'draft-js';
import { parseBlocksToMarkdown } from '@/lib/draft-editor';

const getEmptyEditorState = () =>
  EditorState.createWithContent(ContentState.createFromText(''));

const useEditor = () => {
  const [editorState, setEditorState] = useState(getEmptyEditorState());
  const [editorIsTouched, setEditorIsTouched] = useState(false);
  const content = editorState.getCurrentContent();
  const contentIsValid = content.hasText();
  const hasError = !contentIsValid && editorIsTouched;

  const inputBlurHandler = () => {
    setEditorIsTouched(true);
  };

  const reset = () => {
    setEditorState(getEmptyEditorState());
    setEditorIsTouched(false);
  };

  const toMarkdown = () => {
    return parseBlocksToMarkdown(convertToRaw(content).blocks);
  };

  return {
    state: editorState,
    set: setEditorState,
    blur: inputBlurHandler,
    isValid: contentIsValid,
    content: content,
    reset,
    hasError,
    toMarkdown,
  };
};

export default useEditor;

export type UseEditorResult = ReturnType<typeof useEditor>;
