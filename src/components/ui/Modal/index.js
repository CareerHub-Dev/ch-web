import ReactDOM from "react-dom";
import { useRef } from "react";

import cn from "classnames";
import classes from "./Modal.module.sass";

const Modal = ({ children, onModalClose, onBackdropClick = undefined }) => {
  const modalRef = useRef(null);

  const handleModalClose = () => {
    onModalClose && onModalClose();
  };

  const handleClickRoot = (event) => {
    if (!modalRef.current.contains(event.target)) {
      if (onBackdropClick) {
        onBackdropClick();
        return;
      }
      handleModalClose();
    }
  };

  if (typeof document === "undefined") {
    return null;
  }

  return ReactDOM.createPortal(
    <div
      className={cn(classes.root, classes.open)}
      onMouseDown={handleClickRoot}
    >
      <div ref={modalRef}>{children}</div>
    </div>,
    document.querySelector("#modal")
  );
};
export default Modal;
