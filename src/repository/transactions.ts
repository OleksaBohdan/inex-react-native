import AsyncStorage from '@react-native-async-storage/async-storage';
import { Category } from './categories';

export type TransactionType = 'expenses' | 'incomes';

export type Transaction = {
  value: string;
  transactionType: TransactionType;
  category: Category;
  comment: string;
  date: string;
};

export const createExpenseTransaction = async (transaction: Transaction) => {
  try {
    const valueAsNumber = parseFloat(transaction.value);

    if (isNaN(valueAsNumber)) {
      throw new Error('Value cannot be converted to a number');
    }

    transaction.value = valueAsNumber.toFixed(2);

    const jsonValue = await AsyncStorage.getItem('@expenseTransactions');

    let transactions: Transaction[] = jsonValue != null ? JSON.parse(jsonValue) : [];

    transactions.push(transaction);

    const jsonValueToStore = JSON.stringify(transactions);
    await AsyncStorage.setItem('@expenseTransactions', jsonValueToStore);
  } catch (error) {
    throw new Error(error);
  }
};

export const createIncomeTransaction = async (transaction: Transaction) => {
  try {
    const valueAsNumber = parseFloat(transaction.value);

    if (isNaN(valueAsNumber)) {
      throw new Error('Value cannot be converted to a number');
    }

    transaction.value = valueAsNumber.toFixed(2);

    const jsonValue = await AsyncStorage.getItem('@incomeTransactions');

    let transactions: Transaction[] = jsonValue != null ? JSON.parse(jsonValue) : [];

    transactions.push(transaction);

    const jsonValueToStore = JSON.stringify(transactions);
    await AsyncStorage.setItem('@incomeTransactions', jsonValueToStore);
  } catch (error) {
    throw new Error(error);
  }
};

export const getTransactionsByDay = async (date: string): Promise<Transaction[]> => {
  try {
    // Parse the ISO string date to a date object for comparisons
    const selectedDate = new Date(date);

    // Retrieve transactions from AsyncStorage
    const expenseTransactionsJson = await AsyncStorage.getItem('@expenseTransactions');
    const incomeTransactionsJson = await AsyncStorage.getItem('@incomeTransactions');

    let expenseTransactions: Transaction[] = expenseTransactionsJson != null ? JSON.parse(expenseTransactionsJson) : [];
    let incomeTransactions: Transaction[] = incomeTransactionsJson != null ? JSON.parse(incomeTransactionsJson) : [];

    // Concatenate both transactions arrays
    let transactions = [...expenseTransactions, ...incomeTransactions];

    // Filter transactions by the specified date
    transactions = transactions.filter((transaction) => {
      const transactionDate = new Date(transaction.date);
      return (
        transactionDate.getFullYear() === selectedDate.getFullYear() &&
        transactionDate.getMonth() === selectedDate.getMonth() &&
        transactionDate.getDate() === selectedDate.getDate()
      );
    });

    // Sort transactions by date in ascending order
    transactions.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

    return transactions;
  } catch (error) {
    throw new Error(error);
  }
};
