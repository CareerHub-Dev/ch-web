import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/24/solid";
import { $createCodeNode } from "@lexical/code";
import {
    $createParagraphNode,
    $getSelection,
    $isRangeSelection,
    LexicalEditor,
} from "lexical";
import {
    INSERT_ORDERED_LIST_COMMAND,
    INSERT_UNORDERED_LIST_COMMAND,
    REMOVE_LIST_COMMAND,
} from "@lexical/list";
import { $wrapNodes } from "@lexical/selection";
import { $createHeadingNode, $createQuoteNode } from "@lexical/rich-text";
import TextParagraph from "../icons/TextParagraph";
import TypeH1 from "../icons/TypeH1";
import TypeH2 from "../icons/TypeH2";
import ListUl from "../icons/ListUl";
import ListOl from "../icons/ListOl";
import ChatSquareQuote from "../icons/ChatSquareQuote";
import CodeIcon from "../icons/CodeIcon";

export default function ToolbarDropdown({
    editor,
    currentBlockType,
}: {
    editor: LexicalEditor;
    currentBlockType: string;
}) {
    const formatParagraph = () => {
        if (currentBlockType !== "paragraph") {
            editor.update(() => {
                const selection = $getSelection();

                if ($isRangeSelection(selection)) {
                    $wrapNodes(selection, () => $createParagraphNode());
                }
            });
        }
    };

    const formatLargeHeading = () => {
        if (currentBlockType !== "h1") {
            editor.update(() => {
                const selection = $getSelection();

                if ($isRangeSelection(selection)) {
                    $wrapNodes(selection, () => $createHeadingNode("h1"));
                }
            });
        }
    };

    const formatSmallHeading = () => {
        if (currentBlockType !== "h2") {
            editor.update(() => {
                const selection = $getSelection();

                if ($isRangeSelection(selection)) {
                    $wrapNodes(selection, () => $createHeadingNode("h2"));
                }
            });
        }
    };

    const formatBulletList = () => {
        if (currentBlockType !== "ul") {
            editor.dispatchCommand(
                INSERT_UNORDERED_LIST_COMMAND,
                undefined as void
            );
        } else {
            editor.dispatchCommand(REMOVE_LIST_COMMAND, undefined as void);
        }
    };

    const formatNumberedList = () => {
        if (currentBlockType !== "ol") {
            editor.dispatchCommand(
                INSERT_ORDERED_LIST_COMMAND,
                undefined as void
            );
        } else {
            editor.dispatchCommand(REMOVE_LIST_COMMAND, undefined as void);
        }
    };

    const formatQuote = () => {
        if (currentBlockType !== "quote") {
            editor.update(() => {
                const selection = $getSelection();

                if ($isRangeSelection(selection)) {
                    $wrapNodes(selection, () => $createQuoteNode());
                }
            });
        }
    };

    const formatCode = () => {
        if (currentBlockType !== "code") {
            editor.update(() => {
                const selection = $getSelection();

                if ($isRangeSelection(selection)) {
                    $wrapNodes(selection, () => $createCodeNode());
                }
            });
        }
    };

    const options = [
        {
            icon: TextParagraph,
            label: "Звичайний",
            handle: formatParagraph,
        },
        {
            icon: TypeH1,
            label: "Заголовок",
            handle: formatLargeHeading,
        },
        {
            icon: TypeH2,
            label: "Підзаголовок",
            handle: formatSmallHeading,
        },
        {
            icon: ListUl,
            label: "Маркований Список",
            handle: formatBulletList,
        },
        {
            icon: ListOl,
            label: "Нумерований Список",
            handle: formatNumberedList,
        },
        {
            icon: ChatSquareQuote,
            label: "Цитата",
            handle: formatQuote,
        },
        {
            icon: CodeIcon,
            label: "Код",
            handle: formatCode,
        },
    ];

    return (
        <Menu as="div" className="relative inline-block text-left">
            <div>
                <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 text-sm font-semibold text-gray-900 hover:text-gray-800">
                    {currentBlockType}
                    <ChevronDownIcon
                        className="-mr-1 h-5 w-5 text-gray-400"
                        aria-hidden="true"
                    />
                </Menu.Button>
            </div>

            <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
            >
                <Menu.Items className="absolute left-0 z-10 mt-2 w-56 origin-top-left divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    {options.map((option, optionIdx) => (
                        <Menu.Item key={optionIdx}>
                            {({ active }) => (
                                <button
                                    className={`${
                                        active ? "bg-gray-100" : ""
                                    } group flex w-full items-center rounded-md px-2 py-2 text-sm text-gray-900`}
                                    onClick={option.handle}
                                >
                                    <option.icon className="mr-2 h-5 w-5" />
                                    {option.label}
                                </button>
                            )}
                        </Menu.Item>
                    ))}
                </Menu.Items>
            </Transition>
        </Menu>
    );
}
