import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Category } from '../repository/categories';

export interface IMainState {
  expenseCategories: Category[];
}

const initialState: IMainState = {
  expenseCategories: [],
};

export const mainSlice = createSlice({
  name: 'mainSlice',
  initialState,
  reducers: {
    setExpenseCategories: (state, action: PayloadAction<{ expenseCategories: Category[] }>) => {
      state.expenseCategories = action.payload.expenseCategories;
    },
  },
});

export const { setExpenseCategories } = mainSlice.actions;
export default mainSlice.reducer;
