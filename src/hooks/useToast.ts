import { useRef } from 'react';
import { toast, ToastOptions } from 'react-toastify';

import ToastContext from '@/lib/toasts/ToastContext';
import ErrorToastStrategy from '@/lib/toasts/strategies/ErrorToastStrategy';
import SuccessToastStrategy from '@/lib/toasts/strategies/SuccessToastStrategy';
import WarningToastStrategy from '@/lib/toasts/strategies/WarningToastStrategy';
import IToastStrategy from '@/lib/toasts/strategies/IToastStrategy';

const toastClassesMap = {
  success: SuccessToastStrategy,
  error: ErrorToastStrategy,
  warning: WarningToastStrategy,
};

const useToast = () => {
  const toastRef = useRef<any>(null);

  const baseHandler = (
    message: string,
    strategy: IToastStrategy,
    current: boolean = false
  ) => {
    const toastId = current && toastRef.current;
    const ctx = new ToastContext(strategy);
    ctx.notify(message, toastId);
  };

  const successNotificationHandler = (msg: string, current: boolean = false) =>
    baseHandler(msg, new SuccessToastStrategy(), current);

  const errorNotificationHandler = (msg: string, current: boolean = false) =>
    baseHandler(msg, new ErrorToastStrategy(), current);

  const warningNotificationHandler = (msg: string, current: boolean = false) =>
    baseHandler(msg, new WarningToastStrategy(), current);

  const commonNotificationHandler = (options: {
    msg: string;
    type?: keyof typeof toastClassesMap;
    current?: boolean;
  }) => {
    const ToastClass = toastClassesMap[options.type || 'success'];
    baseHandler(options.msg, new ToastClass(), options.current);
  };

  const setTextHandler = (text: string, options?: ToastOptions) => {
    toastRef.current = toast(text, options);
  };

  return {
    notify: commonNotificationHandler,
    success: successNotificationHandler,
    error: errorNotificationHandler,
    warning: warningNotificationHandler,
    setCurrent: setTextHandler,
  };
};

export default useToast;
