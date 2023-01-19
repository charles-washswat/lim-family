import {combineReducers} from 'redux';
import PhotoList from './photoList';

const rootReducer = combineReducers({
  PhotoList,
});

export type RootState = ReturnType<typeof rootReducer>;

declare module 'react-redux' {
  interface DefaultRootstate extends RootState {}
}

export default rootReducer;
