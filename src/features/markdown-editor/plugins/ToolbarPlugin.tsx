import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  SELECTION_CHANGE_COMMAND,
  FORMAT_TEXT_COMMAND,
  $getSelection,
  $isRangeSelection,
  TextFormatType,
} from "lexical";
import { $getNearestNodeOfType, mergeRegister } from "@lexical/utils";
import { $isListNode, ListNode } from "@lexical/list";
import { $isHeadingNode } from "@lexical/rich-text";
import CodeIcon from "../icons/CodeIcon";
import TypeBold from "../icons/TypeBold";
import TypeItalic from "../icons/TypeItalic";
import TypeStrikeThrough from "../icons/TypeStrikethrough";
import TypeUnderline from "../icons/TypeUnderline";
import cn from "classnames";
import ToolbarDropdown from "./ToolbarDropdown";

const LowPriority = 1;

const supportedBlockTypes = new Set([
  "paragraph",
  "quote",
  "code",
  "h1",
  "h2",
  "ul",
  "ol",
]);

// const blockTypeToBlockName = {
//     code: "Блок коду",
//     h1: "Великий заголовок",
//     h2: "Маленький заголовок",
//     h3: "Заголовок",
//     h4: "Заголовок",
//     h5: "Заголовок",
//     ol: "Нумерований список",
//     paragraph: "Звичайний",
//     quote: "Цитата",
//     ul: "Маркований список",
// };

export default function ToolbarPlugin() {
  const [editor] = useLexicalComposerContext();
  const toolbarRef = useRef(null);
  const [blockType, setBlockType] = useState("paragraph");
  const [_selectedElementKey, setSelectedElementKey] = useState<string | null>(
    null
  );
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isUnderline, setIsUnderline] = useState(false);
  const [isStrikethrough, setIsStrikethrough] = useState(false);
  const [isCode, setIsCode] = useState(false);

  const updateToolbar = useCallback(() => {
    const selection = $getSelection();
    if ($isRangeSelection(selection)) {
      const anchorNode = selection.anchor.getNode();
      const element =
        anchorNode.getKey() === "root"
          ? anchorNode
          : anchorNode.getTopLevelElementOrThrow();
      const elementKey = element.getKey();
      const elementDOM = editor.getElementByKey(elementKey);
      if (elementDOM !== null) {
        setSelectedElementKey(elementKey);
        if ($isListNode(element)) {
          const parentList = $getNearestNodeOfType(anchorNode, ListNode);
          const type = parentList ? parentList.getTag() : element.getTag();
          setBlockType(type);
        } else {
          const type = $isHeadingNode(element)
            ? element.getTag()
            : element.getType();
          setBlockType(type);
        }
      }
      setIsBold(selection.hasFormat("bold"));
      setIsItalic(selection.hasFormat("italic"));
      setIsUnderline(selection.hasFormat("underline"));
      setIsStrikethrough(selection.hasFormat("strikethrough"));
      setIsCode(selection.hasFormat("code"));
    }
  }, [editor]);

  useEffect(() => {
    return mergeRegister(
      editor.registerUpdateListener(({ editorState }) => {
        editorState.read(() => {
          updateToolbar();
        });
      }),
      editor.registerCommand(
        SELECTION_CHANGE_COMMAND,
        (_payload, _newEditor) => {
          updateToolbar();
          return false;
        },
        LowPriority
      )
    );
  }, [editor, updateToolbar]);

  const typeButtons: Array<{
    format: TextFormatType;
    icon: (props: { className?: string }) => JSX.Element;
    isActive: boolean;
  }> = [
    {
      format: "bold",
      icon: TypeBold,
      isActive: isBold,
    },
    {
      format: "italic",
      icon: TypeItalic,
      isActive: isItalic,
    },
    {
      format: "underline",
      icon: TypeUnderline,
      isActive: isUnderline,
    },
    {
      format: "strikethrough",
      icon: TypeStrikeThrough,
      isActive: isStrikethrough,
    },
    {
      format: "code",
      icon: CodeIcon,
      isActive: isCode,
    },
  ];

  return (
    <div
      className="flex border-b items-center space-x-3 justify-between border-gray-200 px-2 py-2 sm:px-3"
      ref={toolbarRef}
    >
      {supportedBlockTypes.has(blockType) ? (
        <div className="border-r border-gray-200 px-2">
          <ToolbarDropdown editor={editor} currentBlockType={blockType} />
        </div>
      ) : (
        <div />
      )}
      <div className="flex justify-between">
        <div className="flex items-center space-x-5">
          {typeButtons.map((btn, btnIdx) => (
            <div key={btnIdx} className="flow-root">
              <button
                type="button"
                onClick={() =>
                  editor.dispatchCommand(FORMAT_TEXT_COMMAND, btn.format)
                }
                className={cn(
                  btn.isActive
                    ? "text-gray-900 bg-gray-100"
                    : "text-gray-400 hover:text-gray-500",
                  "inline-flex h-6 w-6 items-center justify-center rounded-md"
                )}
                aria-label={btn.format}
              >
                <btn.icon className="h-5 w-5 opacity-60 disabled:opacity-20" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
