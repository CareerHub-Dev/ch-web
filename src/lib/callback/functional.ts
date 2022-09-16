import type { CallbackCreator } from './types';

const doNothing = () => {};

export const createCallback: CallbackCreator = (map) => {
  return (params) => {
    for (const item of map) {
      if (item.status === params.status) {
        return item.callback;
      }
    }
    return doNothing;
  };
};
