import { RawDraftContentBlock } from "draft-js";

const markdownMapping = {
  "header-one": "# ",
  "header-two": "## ",
  "header-three": "### ",
  "header-four": "#### ",
  "header-five": "##### ",
  "header-six": "###### ",
  "unordered-list-item": "* ",
  unstyled: "",
};

type MarkdownBlockType = keyof typeof markdownMapping;

export const parseBlocksToMarkdown = (blocks: RawDraftContentBlock[]) => {
  return blocks
    .map((block) => {
      if (!block.text?.trim()) {
        return "";
      }
      return markdownMapping[block.type as MarkdownBlockType] + block.text;
    })
    .join("\n");
};
