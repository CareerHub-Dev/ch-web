import { type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import classes from './ModalWithBackdrop.module.scss';

const Backdrop: React.FC<{ onClose: AnyFn; overrideClassName?: string }> = ({
  onClose,
  overrideClassName,
}) => {
  const backdropClass = overrideClassName
    ? overrideClassName
    : classes.backdrop;

  return <div className={backdropClass} onClick={onClose} />;
};

const ModalOverlay: React.FC<{
  overrideClassName?: string;
  children: ReactNode;
}> = ({ overrideClassName, children }) => {
  const overlayClass = overrideClassName ? overrideClassName : classes.modal;

  return <div className={overlayClass}>{children}</div>;
};

const ModalWithBackdrop: React.FC<{
  onClose: AnyFn;
  overrideOverlayClass?: string;
  overrideBackdropClass?: string;
  children: ReactNode;
}> = ({ onClose, overrideOverlayClass, overrideBackdropClass, children }) => {
  if (typeof document === 'undefined') {
    return null;
  }

  const portalElement = document.getElementById('modal');
  return (
    <>
      {createPortal(
        <Backdrop
          onClose={onClose}
          overrideClassName={overrideBackdropClass}
        />,
        portalElement!,
      )}
      {createPortal(
        <ModalOverlay overrideClassName={overrideOverlayClass}>
          {children}
        </ModalOverlay>,
        portalElement!,
      )}
    </>
  );
};

export default ModalWithBackdrop;
