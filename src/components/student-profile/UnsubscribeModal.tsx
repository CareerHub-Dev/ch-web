import { createPortal } from 'react-dom';

const UnsubscribeModal = ({
  from,
  onConfirm,
  disabled,
  onClose,
}: {
  from: string;
  disabled: boolean;
  onConfirm: () => void;
  onClose: () => void;
}) => {
  const close = (event: any) => {
    if (event.target.id === 'unsubscribeModal') {
      onClose();
    }
  };

  return (
    <>
      {createPortal(
        <div
          id="unsubscribeModal"
          className="fixed inset-0 z-50 bg-primaryGrayDarker bg-opacity-75 flex items-center justify-center"
          onClick={close}
        >
          <div className="rounded-xl bg-white shadow-md overflow-hidden">
            <div className="pt-8 px-8 pb-4">
              <p>
                Відписатися від <strong>{from}</strong>?
              </p>
            </div>
            <div className="flex flex-col gap-2 mt-4 sm:flex-row-reverse bg-lightGray px-8 py-4">
              <button
                className="text-white py-1 px-8 bg-primaryRed rounded-lg 
                transition-all ease-in-out duration-200
                enabled:hover:opacity-90
                disabled:opacity-50"
                onClick={onConfirm}
                disabled={disabled}
              >
                Так
              </button>
              <button
                className="text-white py-1 px-8 bg-lightBlueAccent rounded-lg 
                transition-all ease-in-out duration-200
                enabled:hover:opacity-90
                disabled:opacity-50"
                onClick={onClose}
                disabled={disabled}
              >
                Ні
              </button>
            </div>
          </div>
        </div>,
        document.getElementById('modal')!
      )}
    </>
  );
};
export default UnsubscribeModal;
