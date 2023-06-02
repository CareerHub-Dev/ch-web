import { useRef } from "react";
import { toast, ToastOptions } from "react-toastify";

import ToastContext from "@/lib/toasts/ToastContext";
import ErrorToastStrategy from "@/lib/toasts/strategies/ErrorToastStrategy";
import SuccessToastStrategy from "@/lib/toasts/strategies/SuccessToastStrategy";
import WarningToastStrategy from "@/lib/toasts/strategies/WarningToastStrategy";
import IToastStrategy from "@/lib/toasts/strategies/IToastStrategy";

export default function useToast() {
  const toastRef = useRef<any>(null);

  const notify = (
    message: string,
    strategy: IToastStrategy,
    current: boolean = false
  ) => {
    const toastId = current && toastRef.current;
    const ctx = new ToastContext(strategy);
    ctx.notify(message, toastId);
  };

  const success = (msg: string, current: boolean = false) =>
    notify(msg, new SuccessToastStrategy(), current);

  const error = (msg: string, current: boolean = false) =>
    notify(msg, new ErrorToastStrategy(), current);

  const warning = (msg: string, current: boolean = false) =>
    notify(msg, new WarningToastStrategy(), current);

  const setCurrent = (
    text: string,
    options?: Omit<ToastOptions, "isLoading" | "type">
  ) => {
    toastRef.current = toast(text, { ...options, isLoading: true });
  };

  const clearCurrent = () => {
    toast.dismiss(toastRef.current);
  };

  return {
    success,
    error,
    warning,
    setCurrent,
    clearCurrent,
  };
}
