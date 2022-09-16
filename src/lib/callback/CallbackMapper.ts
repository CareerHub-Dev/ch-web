import type { CallbackFn, CallbackMap } from './types';
import RequestStatus from '@/models/enums/RequestStatus';

class CallbackMapper {
  private callbacks: CallbackMap = [];

  public add = (status: RequestStatus, callback: CallbackFn): void => {
    this.callbacks.push({ status, callback });
  };

  public remove = (status: RequestStatus): void => {
    this.callbacks = this.callbacks.filter(
      (callback) => callback.status !== status
    );
  };

  public get map() {
    return this.callbacks;
  }
}
export default CallbackMapper;
