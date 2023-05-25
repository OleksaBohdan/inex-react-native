import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Category } from '../repository/categories';

export interface IMainState {
  expenseCategories: Category[];
  incomeCategories: Category[];
}

const initialState: IMainState = {
  expenseCategories: [],
  incomeCategories: [],
};

export const mainSlice = createSlice({
  name: 'mainSlice',
  initialState,
  reducers: {
    setExpenseCategories: (state, action: PayloadAction<{ expenseCategories: Category[] }>) => {
      state.expenseCategories = action.payload.expenseCategories;
    },
    setIncomeCategories: (state, action: PayloadAction<{ incomeCategories: Category[] }>) => {
      state.incomeCategories = action.payload.incomeCategories;
    },
  },
});

export const { setExpenseCategories, setIncomeCategories } = mainSlice.actions;
export default mainSlice.reducer;
