import { HeadingNode, QuoteNode } from "@lexical/rich-text";
import { TableCellNode, TableNode, TableRowNode } from "@lexical/table";
import { ListItemNode, ListNode } from "@lexical/list";
import { CodeHighlightNode, CodeNode } from "@lexical/code";
import { AutoLinkNode, LinkNode } from "@lexical/link";
import { $createParagraphNode, $createTextNode, $getRoot } from "lexical";
import theme from "./theme";

function prepopulatedText() {
    const root = $getRoot();
    const paragraph = $createParagraphNode();
    paragraph.append($createTextNode(""));
    root.append(paragraph);
}

const baseEditorConfig = {
    editorState: prepopulatedText,
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

export function deriveConfig(namespace: string) {
    return {
        ...baseEditorConfig,
        namespace,
    };
}
