import IToastStrategy from './IToastStrategy';
import { toast } from 'react-toastify';

class ErrorToastStrategy implements IToastStrategy {
  notify(message: string, currentToastId?: number): void {
    if (currentToastId)
      toast.update(currentToastId, {
        render: message,
        type: toast.TYPE.ERROR,
        autoClose: 5000,
        closeButton: null,
        isLoading: false,
      });
    else
      toast.error(message, {
        position: 'top-center',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
  }
}
export default ErrorToastStrategy;
