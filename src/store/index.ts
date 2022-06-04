import { configureStore } from '@reduxjs/toolkit';
import cvConstructorReducer from './cv-constructor';
import studentReducer from './student';

const store = configureStore({
  reducer: {
    cvConstructor: cvConstructorReducer,
    student: studentReducer,
  },
});
export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
