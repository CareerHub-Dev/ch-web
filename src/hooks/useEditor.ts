import { useState } from "react";
import { EditorState, ContentState, convertToRaw } from "draft-js";
import { parseBlocksToMarkdown } from "@/lib/draft-editor";

function getEmptyEditorState() {
    return EditorState.createWithContent(ContentState.createFromText(""));
}

export default function useEditor() {
    const [editorState, setEditorState] = useState(getEmptyEditorState());
    const [editorIsTouched, setEditorIsTouched] = useState(false);
    const content = editorState.getCurrentContent();
    const contentIsValid = content.hasText();
    const hasError = !contentIsValid && editorIsTouched;

    const blur = () => {
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
        blur,
        isValid: contentIsValid,
        content,
        reset,
        hasError,
        toMarkdown,
    };
}

export type UseEditorResult = ReturnType<typeof useEditor>;
