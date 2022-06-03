import LoadingSpinner from '../LoadingSpinner';
import ModalWithBackdrop from './ModalWithBackdrop';
import classes from './ModalLoading.module.scss';

const ModalLoading: React.FC = () => {
  const clickHandler = () => {};

  return (
    <ModalWithBackdrop
      onClose={clickHandler}
      overrideOverlayClass={classes.overlay}
      overrideBackdropClass={classes.backdrop}
    >
      <LoadingSpinner />
    </ModalWithBackdrop>
  );
};
export default ModalLoading;
