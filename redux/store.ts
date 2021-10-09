import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
// reducers
import { launchListReducer } from './features/launchListSlice';

export const store = configureStore({
  reducer: {
    launchList: launchListReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>