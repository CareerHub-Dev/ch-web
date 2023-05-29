import IToastStrategy from "./IToastStrategy";
import { toast } from "react-toastify";

class SuccessToastStrategy implements IToastStrategy {
  notify(message: string, currentToastId?: number): void {
    if (currentToastId)
      toast.update(currentToastId, {
        render: message,
        type: toast.TYPE.SUCCESS,
        autoClose: 5000,
        closeButton: null,
        isLoading: false,
      });
    else
      toast.success(message, {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
  }
}
export default SuccessToastStrategy;
