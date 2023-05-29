import { HeadingNode, QuoteNode } from "@lexical/rich-text";
import { TableCellNode, TableNode, TableRowNode } from "@lexical/table";
import { ListItemNode, ListNode } from "@lexical/list";
import { $createCodeNode, CodeHighlightNode, CodeNode } from "@lexical/code";
import { AutoLinkNode, LinkNode } from "@lexical/link";
import { $createParagraphNode, $createTextNode, $getRoot } from "lexical";
import theme from "./theme";
import { InitialConfigType } from "@lexical/react/LexicalComposer";
import { $convertFromMarkdownString } from "@lexical/markdown";
import { PLAYGROUND_TRANSFORMERS } from "./plugins/markdown-transformers";

function prepopulatedText() {
  const root = $getRoot();
  const paragraph = $createParagraphNode();
  paragraph.append($createTextNode(""));
  root.append(paragraph);
}

function prepopulatedMarkdownContent(content: string) {
  const root = $getRoot();
  root
    .clear()
    .append($createCodeNode("markdown").append($createTextNode(content)));

  const firstChild = root.getFirstChild();
  if (firstChild !== null) {
    $convertFromMarkdownString(
      firstChild.getTextContent(),
      PLAYGROUND_TRANSFORMERS
    );
  }
}

const baseEditorConfig = {
  theme,
  onError(error: unknown) {
    throw error;
  },
  nodes: [
    HeadingNode,
    ListNode,
    ListItemNode,
    QuoteNode,
    CodeNode,
    CodeHighlightNode,
    TableNode,
    TableCellNode,
    TableRowNode,
    AutoLinkNode,
    LinkNode,
  ],
};

export function deriveConfig(namespace: string): InitialConfigType {
  return {
    ...baseEditorConfig,
    editorState: prepopulatedText,
    namespace,
  };
}

export function deriveReadonlyConfig(
  namespace: string,
  content: string
): InitialConfigType {
  return {
    ...baseEditorConfig,
    editable: false,
    editorState: prepopulatedMarkdownContent.bind(null, content),
    namespace,
  };
}
