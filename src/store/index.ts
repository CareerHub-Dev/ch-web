import { configureStore } from '@reduxjs/toolkit';
import cvConstructorReducer from './cv-constructor';

const store = configureStore({
  reducer: {
    cvConstructor: cvConstructorReducer,
  },
});
export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
