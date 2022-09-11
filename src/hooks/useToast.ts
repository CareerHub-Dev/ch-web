import ToastContext from '@/lib/toasts/ToastContext';
import ErrorToastStrategy from '@/lib/toasts/strategies/ErrorToastStrategy';
import SuccessToastStrategy from '@/lib/toasts/strategies/SuccessToastStrategy';
import WarningToastStrategy from '@/lib/toasts/strategies/WarningToastStrategy';

const toasClassesMap = {
  success: SuccessToastStrategy,
  error: ErrorToastStrategy,
  warning: WarningToastStrategy,
};

const useToast = () => {
  const notificationHandler = (options: {
    msg: string;
    type?: keyof typeof toasClassesMap;
  }) => {
    const ToastClass = toasClassesMap[options.type || 'success'];
    const toastContext = new ToastContext(new ToastClass());
    toastContext.notify(options.msg);
  };

  return {
    notify: notificationHandler,
  };
};
export default useToast;
