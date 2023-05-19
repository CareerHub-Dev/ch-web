import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import ToolbarPlugin from "./plugins/ToolbarPlugin";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import { ListPlugin } from "@lexical/react/LexicalListPlugin";
import { MarkdownShortcutPlugin } from "@lexical/react/LexicalMarkdownShortcutPlugin";
import { TRANSFORMERS, $convertToMarkdownString } from "@lexical/markdown";
import { PLAYGROUND_TRANSFORMERS } from "./plugins/markdown-transformers";
import { MutableRefObject } from "react";
import { EditorState } from "lexical/LexicalEditorState";
import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary";
import { InitialConfigType } from "@lexical/react/LexicalComposer";

export default function Editor({
    config,
    textRef,
}: {
    config: InitialConfigType;
    textRef: MutableRefObject<string>;
}) {
    const onEditorStateChange = (editorState: EditorState) => {
        editorState.read(() => {
            textRef.current = $convertToMarkdownString(PLAYGROUND_TRANSFORMERS);
        });
    };
    return (
        <>
            <LexicalComposer initialConfig={config}>
                <div className="relative leading-5 rounded-md text-black font-normal text-left border border-gray-300 shadow-sm focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500 ">
                    <ToolbarPlugin />
                    <div className="relative bg-white rounded-b-md">
                        <OnChangePlugin onChange={onEditorStateChange} />
                        <RichTextPlugin
                            ErrorBoundary={LexicalErrorBoundary}
                            contentEditable={
                                <ContentEditable className="min-h-[150px] resize-none text-base caret-gray-900 relative px-2.5 py-3.5 outline-none" />
                            }
                            placeholder={null}
                        />
                        <ListPlugin />
                        <MarkdownShortcutPlugin transformers={TRANSFORMERS} />
                    </div>
                </div>
            </LexicalComposer>
        </>
    );
}
