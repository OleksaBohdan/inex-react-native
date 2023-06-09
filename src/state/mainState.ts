import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Category } from '../repository/categories';
import { TransactionType, Transaction } from '../repository/transactions';

export interface IMainState {
  expenseCategories: Category[];
  incomeCategories: Category[];
  selectedTransactionType: TransactionType;
  enteredValue: string;
  enteredComment: string;
  selectedDate: string;
  transactionCreated: boolean;
  selectedTransaction: Transaction;
}

const initialState: IMainState = {
  expenseCategories: [],
  incomeCategories: [],
  selectedTransactionType: 'expenses',
  enteredValue: '',
  enteredComment: '',
  selectedDate: new Date().toISOString(),
  transactionCreated: false,
  selectedTransaction: undefined,
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
    setSelectedTransactionType: (state, action: PayloadAction<{ selectedTransactionType: TransactionType }>) => {
      state.selectedTransactionType = action.payload.selectedTransactionType;
    },
    setEnteredValue: (state, action: PayloadAction<{ enteredValue: string }>) => {
      state.enteredValue = action.payload.enteredValue;
    },
    setEnteredComment: (state, action: PayloadAction<{ enteredComment: string }>) => {
      state.enteredComment = action.payload.enteredComment;
    },
    setSelectedDate: (state, action: PayloadAction<{ selectedDate: string }>) => {
      state.selectedDate = action.payload.selectedDate;
    },
    setSelectedTransaction: (state, action: PayloadAction<{ selectedTransaction: Transaction }>) => {
      state.selectedTransaction = action.payload.selectedTransaction;
    },
    toggleTransactionCreated: (state) => {
      state.transactionCreated = state.transactionCreated ? false : true;
    },
  },
});

export const {
  setExpenseCategories,
  setIncomeCategories,
  setSelectedTransactionType,
  setEnteredValue,
  setEnteredComment,
  setSelectedDate,
  setSelectedTransaction,
  toggleTransactionCreated,
} = mainSlice.actions;
export default mainSlice.reducer;
