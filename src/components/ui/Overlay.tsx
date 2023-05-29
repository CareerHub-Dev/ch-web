import { type ReactNode } from "react";
import { useOnClickOutside } from "usehooks-ts";
import { useRef } from "react";

const Overlay = ({
  children,
  onOutsideClick,
  className,
}: {
  children: ReactNode;
  onOutsideClick: AnyFn;
  className?: string;
}) => {
  const ref = useRef(null);
  useOnClickOutside(ref, onOutsideClick);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
};

export default Overlay;
