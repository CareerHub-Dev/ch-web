import { createPortal } from "react-dom";

const ForgotPasswordModal = ({
  onClose,
}: {
  currentEmail: string;
  onClose: () => void;
}) => {
  const close = (event: any) => {
    if (event.target.id === "forgotPasswordModal") {
      onClose();
    }
  };

  if (typeof document === "undefined") {
    return null;
  }

  return createPortal(
    <div
      id="forgotPasswordModal"
      className="fixed inset-0 z-50 bg-primaryGrayDarker bg-opacity-60 flex items-start justify-center"
      onClick={close}
    >
      <div className=" mt-12 p-8 rounded-xl bg-white shadow-md">Forgot psw</div>
    </div>,
    document.getElementById("modal")!
  );
};
export default ForgotPasswordModal;
