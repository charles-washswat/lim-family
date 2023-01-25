import {configureStore} from '@reduxjs/toolkit';
import PhotoList from './photoList';

export const store = configureStore({
  reducer: {
    photoList: PhotoList,
  },
  devTools: process.env.NODE_ENV !== 'production',
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
