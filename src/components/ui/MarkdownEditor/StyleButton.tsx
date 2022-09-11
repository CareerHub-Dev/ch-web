import React from 'react';
import cn from 'classnames';

const StyleButton = ({
  onToggle,
  active,
  label,
  style,
}: {
  onToggle: AnyFn;
  active: boolean;
  label: string;
  style: string;
}) => {
  const mouseDownHandler = (e: React.MouseEvent) => {
    e.preventDefault();
    onToggle(style);
  };

  return (
    <span
      className={cn(
        'RichEditor-styleButton',
        active && 'RichEditor-activeButton'
      )}
      onMouseDown={mouseDownHandler}
    >
      {label}
    </span>
  );
};
export default StyleButton;
