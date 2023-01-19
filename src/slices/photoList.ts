import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import React, {useState, useEffect} from 'react';

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
    add: {
      prepare(picture: string, title: string, content: string) {
        const prepared = {payload: {id: nextId, picture, title, content}};
        nextId += 1;
        return prepared;
        useEffect(() => {
          console.log('prepared', prepared);
        }, [prepared]);
      },
      reducer(
        state,
        action: PayloadAction<{
          id: number;
          picture: string;
          title: string;
          content: string;
        }>,
      ) {
        state.push({
          ...action.payload,
          isChecked: false,
        });
      },
    },

    remove(state, action: PayloadAction<number>) {
      const index = state.findIndex(
        photoList => photoList.id === action.payload,
      );
      state.splice(index);
    },

    toggle(state, action: PayloadAction<number>) {
      const selected = state.find(photoList => photoList.id === action.payload);
      if (!selected) {
        return;
      }
      selected.isChecked = !selected.isChecked;
    },
  },
});

export const {add, remove, toggle} = photoListSlice.actions;
export default photoListSlice.reducer;
