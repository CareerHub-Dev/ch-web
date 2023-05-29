import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { ListPlugin } from "@lexical/react/LexicalListPlugin";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { deriveReadonlyConfig } from "./config";
import { useMemo } from "react";
import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary";

export default function ReadOnlyMarkdown({
  content,
  id,
}: {
  content: string;
  id: string;
}) {
  const config = useMemo(
    () => deriveReadonlyConfig(id, content),
    [id, content]
  );

  return (
    <LexicalComposer initialConfig={config}>
      <div className="relative leading-5 bg-white rounded-md text-black font-normal text-left">
        <RichTextPlugin
          ErrorBoundary={LexicalErrorBoundary}
          contentEditable={
            <ContentEditable className="resize-none text-base outline-none" />
          }
          placeholder={null}
        />
        <ListPlugin />
      </div>
    </LexicalComposer>
  );
}
