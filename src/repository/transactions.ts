import AsyncStorage from '@react-native-async-storage/async-storage';
import { Category } from './categories';

export type TransactionType = 'expenses' | 'incomes';

export type Transaction = {
  value: number;
  transactionType: TransactionType;
  category: Category;
  comment: string;
  date: Date;
};
