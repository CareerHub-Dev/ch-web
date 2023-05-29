import IToastStrategy from "./IToastStrategy";
import { toast } from "react-toastify";

class WarningToastStrategy implements IToastStrategy {
  notify(message: string): void {
    toast.warn(message, {
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
export default WarningToastStrategy;
