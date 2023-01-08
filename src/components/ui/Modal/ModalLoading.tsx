import LoadingSpinner from '../LoadingSpinner';
import ModalPortal from '../ModalPortal';

const ModalLoading = () => {
  return (
    <ModalPortal>
      <div
        id="unsubscribeModal"
        className="fixed inset-0 z-50 bg-primaryGrayDarker bg-opacity-75 flex items-center justify-center"
        onClick={close}
      >
        <LoadingSpinner className="text-primaryBlue h-32 w-32 opacity-100" />
      </div>
    </ModalPortal>
  );
};
export default ModalLoading;
