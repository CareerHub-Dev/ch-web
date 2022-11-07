import LoadingSpinner from '../LoadingSpinner';
import { createPortal } from 'react-dom';

const ModalLoading = () => {
  return (
    <>
      {createPortal(
        <div
          id="unsubscribeModal"
          className="fixed inset-0 z-50 bg-primaryGrayDarker bg-opacity-75 flex items-center justify-center"
          onClick={close}
        >
          <LoadingSpinner className="text-primaryBlue h-32 w-32 opacity-100" />
        </div>,
        document.getElementById('modal')!
      )}
    </>
  );
};
export default ModalLoading;
