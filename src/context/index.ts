import { configureStore } from '@reduxjs/toolkit';
import cvConstructorReducer from './cv-constructor';
import studentReducer from './student';
import jobOffersFeedReducer from './job-offers-feed';

const store = configureStore({
  reducer: {
    cvConstructor: cvConstructorReducer,
    student: studentReducer,
    jobOffersFeed: jobOffersFeedReducer,
  },
});
export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
