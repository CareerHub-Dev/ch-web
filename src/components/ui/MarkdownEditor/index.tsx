import { useRef, useState, useEffect } from 'react';
import { ContentBlock, Editor, RichUtils } from 'draft-js';
import BlockStyleControls from './BlockStyleControls';
import type { UseEditorResult } from '@/hooks/useEditor';

import cn from 'classnames';

const blockTypes = [
  { label: 'H1', style: 'header-one' },
  { label: 'H2', style: 'header-two' },
  { label: 'H3', style: 'header-three' },
  { label: 'H4', style: 'header-four' },
  { label: 'H5', style: 'header-five' },
  { label: 'H6', style: 'header-six' },
  { label: 'UL', style: 'unordered-list-item' },
];

const styleMapping = {
  'header-one': 'md-h1',
  'header-two': 'md-h2',
  'header-three': 'md-h3',
  'header-four': 'md-h4',
  'header-five': 'md-h5',
  'header-six': 'md-h6',
  'unordered-list-item': 'md-li',
  unstyled: 'md-p',
};

const getBlockStyle = (block: ContentBlock) => {
  const blockType = block.getType();
  const mapped = styleMapping[blockType as keyof typeof styleMapping];
  return mapped || 'md-p';
};

/** Note: this component must be mounted before render
 *  since draft-js can only render at client side
 */
const MarkdownEditor = ({ editor }: { editor: UseEditorResult }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  const editorRef = useRef<Editor>(null);
  const editorContent = editor.content;
  const noText = !editorContent.hasText();
  const firstBlockIsStyled =
    !noText && editorContent.getFirstBlock().getType() !== 'unstyled';

  const focus = () => {
    if (editorRef.current) {
      editorRef.current.focus();
    }
  };

  const toggle = (blockType: string) => {
    const newState = RichUtils.toggleBlockType(editor.state, blockType);
    editor.set(newState);
  };

  const className = cn('md editor', {
    'placeholder-hidden': firstBlockIsStyled,
  });

  const wrapperClassName = cn('editor-wrapper', {
    'wrapper-invalid': editor.hasError,
  });

  if (!mounted) {
    return null;
  }

  return (
    <div className={wrapperClassName}>
      <BlockStyleControls
        blockTypes={blockTypes}
        editorState={editor.state}
        onToggle={toggle}
      />
      <div className={className} onClick={focus}>
        <Editor
          blockStyleFn={getBlockStyle}
          editorState={editor.state}
          onChange={editor.set}
          placeholder="Введіть опис..."
          ref={editorRef}
          spellCheck={true}
        />
      </div>
    </div>
  );
};

export default MarkdownEditor;
