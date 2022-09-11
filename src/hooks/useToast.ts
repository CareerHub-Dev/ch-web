import { useRef } from 'react';

import ToastContext from '@/lib/toasts/ToastContext';
import ErrorToastStrategy from '@/lib/toasts/strategies/ErrorToastStrategy';
import SuccessToastStrategy from '@/lib/toasts/strategies/SuccessToastStrategy';
import WarningToastStrategy from '@/lib/toasts/strategies/WarningToastStrategy';
import { toast, ToastOptions } from 'react-toastify';

const toasClassesMap = {
  success: SuccessToastStrategy,
  error: ErrorToastStrategy,
  warning: WarningToastStrategy,
};

const useToast = () => {
  const toastRef = useRef<any>(null);

  const notificationHandler = (options: {
    msg: string;
    type?: keyof typeof toasClassesMap;
    current?: boolean;
  }) => {
    const ToastClass = toasClassesMap[options.type || 'success'];
    const toastContext = new ToastContext(new ToastClass());
    const notifyOnCurrent = !!options.current;
    toastContext.notify(options.msg, notifyOnCurrent && toastRef.current);
  };

  const setTextHandler = (text: string, options?: ToastOptions) => {
    toastRef.current = toast(text, options);
  };

  return {
    notify: notificationHandler,
    setCurrent: setTextHandler,
  };
};
export default useToast;
