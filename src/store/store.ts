import AppReducer from '@reducers/AppSlice';
import { configureStore } from '@reduxjs/toolkit';

const store = configureStore({
  reducer: {
    App: AppReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
