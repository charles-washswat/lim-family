import {isTemplateElement} from '@babel/types';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export interface PhotoList {
  id: number;
  picture: string;
  title: string;
  content: string;
  isChecked: boolean;
}

const initialState: PhotoList[] = [];

let nextId = 1;

const photoListSlice = createSlice({
  name: 'photoList',
  initialState: initialState,
  reducers: {
    // add: {
    //   prepare(picture: string, title: string, content: string) {
    //     const prepared = {payload: {id: nextId, picture, title, content}};
    //     nextId += 1;
    //     return prepared;
    //   },
    //   reducer(
    //     state,
    //     action: PayloadAction<{
    //       id: number;
    //       picture: string;
    //       title: string;
    //       content: string;
    //     }>,
    //   ) {
    //     state.push({
    //       ...action.payload,
    //       isChecked: false,
    //     });
    //   },
    // },
    add: (
      state,
      action: PayloadAction<{
        picture: string;
        title: string;
        content: string;
      }>,
    ) => {
      console.log('state>>>', state);
      console.log('action>>>', action);
      state.push({
        id: nextId,
        ...action.payload,
        isChecked: false,
      });
      nextId = +1;
    },

    // remove(state, action: PayloadAction<number>) {
    //   const index = state.findIndex(
    //     photoList => photoList.id === action.payload,
    //   );
    //   state.splice(index);
    // },
    remove: state => {
      state = state.filter(item => item.isChecked === false);
    },

    // toggle(state, action: PayloadAction<number>) {
    //   const selected = state.find(photoList => photoList.id === action.payload);
    //   if (!selected) {
    //     return;
    //   }
    //   selected.isChecked = !selected.isChecked;
    // },
    toggle: (state, action: PayloadAction<number>) => {
      state = state.map(item =>
        item.id === action.payload
          ? {...item, isChecked: !item.isChecked}
          : item,
      );
      // state = state.map(item => item)
    },
  },
});

export const {add, remove, toggle} = photoListSlice.actions;
export default photoListSlice.reducer;
