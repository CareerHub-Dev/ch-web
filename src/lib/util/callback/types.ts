import RequestStatus from '@/model/enums/RequestStatus';

export type CallbackParams =
  | { status: RequestStatus.Error; message: string }
  | { status: RequestStatus.Success; data?: any; message?: string }
  | { status: RequestStatus.Pending; message?: string }
  | { status: RequestStatus.Unsent }
  | { status: RequestStatus.ResponseRecieved; message?: string };

export type CallbackFn = (params: CallbackParams) => void;

export type CallbackMapItem = {
  status: RequestStatus;
  callback: CallbackFn;
};

export type CallbackMap = Array<CallbackMapItem>;

export type CallbackCreator = (map: CallbackMap) => CallbackFn;
