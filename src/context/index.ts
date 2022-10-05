import { configureStore } from '@reduxjs/toolkit';
import cvConstructorReducer from './cv-constructor';
import jobOffersFeedReducer from './job-offers-feed';

const store = configureStore({
  reducer: {
    cvConstructor: cvConstructorReducer,
    jobOffersFeed: jobOffersFeedReducer,
  },
});
export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
