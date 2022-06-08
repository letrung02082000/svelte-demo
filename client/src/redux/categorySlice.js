import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  data: [],
  selected: '',
  parent: '',
};

export const slice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    updateCategoryList: (state, action) => {
      state.data = action.payload;
    },
    updateSelectedCategory: (state, action) => {
      state.selected = action.payload;
    },
    updateSelectedParent: (state, action) => {
      state.parent = action.payload;
    },
  },
});

export const {
  updateCategoryList,
  updateSelectedCategory,
  updateSelectedParent,
} = slice.actions;
export const selectCategoryList = (state) => state.category;
export default slice.reducer;
