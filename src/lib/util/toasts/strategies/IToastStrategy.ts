import { Toast } from 'react-toastify/dist/types';

interface IToastStrategy {
  notify(message: string, currentToastId?: number): void;
}
export default IToastStrategy;
