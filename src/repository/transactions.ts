import AsyncStorage from '@react-native-async-storage/async-storage';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';
import { Category } from './categories';

import { updateIncomeCategoryRange, updateExpenseCategoryRange } from './categories';

export type TransactionType = 'expenses' | 'incomes';

export type Transaction = {
  id: string;
  value: string;
  transactionType: TransactionType;
  category: Category;
  comment: string;
  date: string;
};

export const createExpenseTransaction = async (transaction: Transaction) => {
  try {
    transaction.id = uuidv4();
    const valueAsNumber = parseFloat(transaction.value.replace(',', '.'));
    if (isNaN(valueAsNumber)) {
      throw new Error('Value cannot be converted to a number');
    }
    transaction.value = valueAsNumber.toFixed(2);

    const transactionDate = new Date(transaction.date);
    const currentDate = new Date();
    if (
      transactionDate.getDate() === currentDate.getDate() &&
      transactionDate.getMonth() === currentDate.getMonth() &&
      transactionDate.getFullYear() === currentDate.getFullYear()
    ) {
      let now = new Date();
      let offset = now.getTimezoneOffset() * 60000;
      let localISOTime = new Date(now.getTime() - offset).toISOString().slice(0, -1);
      transaction.date = localISOTime;
    }

    const jsonValue = await AsyncStorage.getItem('@expenseTransactions');
    let transactions: Transaction[] = jsonValue != null ? JSON.parse(jsonValue) : [];
    transactions.push(transaction);
    const jsonValueToStore = JSON.stringify(transactions);

    await AsyncStorage.setItem('@expenseTransactions', jsonValueToStore);

    const categoryName = transaction.category.name;
    await updateExpenseCategoryRange(categoryName);
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

export const createIncomeTransaction = async (transaction: Transaction) => {
  try {
    transaction.id = uuidv4();
    const valueAsNumber = parseFloat(transaction.value.replace(',', '.'));
    if (isNaN(valueAsNumber)) {
      throw new Error('Value cannot be converted to a number');
    }
    transaction.value = valueAsNumber.toFixed(2);

    const transactionDate = new Date(transaction.date);
    const currentDate = new Date();
    if (
      transactionDate.getDate() === currentDate.getDate() &&
      transactionDate.getMonth() === currentDate.getMonth() &&
      transactionDate.getFullYear() === currentDate.getFullYear()
    ) {
      let now = new Date();
      let offset = now.getTimezoneOffset() * 60000;
      let localISOTime = new Date(now.getTime() - offset).toISOString().slice(0, -1);
      transaction.date = localISOTime;
    }

    const jsonValue = await AsyncStorage.getItem('@incomeTransactions');
    let transactions: Transaction[] = jsonValue != null ? JSON.parse(jsonValue) : [];
    transactions.push(transaction);
    const jsonValueToStore = JSON.stringify(transactions);

    await AsyncStorage.setItem('@incomeTransactions', jsonValueToStore);

    const categoryName = transaction.category.name;
    await updateIncomeCategoryRange(categoryName);
  } catch (error) {
    throw new Error(error);
  }
};

export const getTransactionsByDay = async (date: string): Promise<Transaction[]> => {
  try {
    const selectedDate = new Date(date);
    const expenseTransactionsJson = await AsyncStorage.getItem('@expenseTransactions');
    const incomeTransactionsJson = await AsyncStorage.getItem('@incomeTransactions');

    let expenseTransactions: Transaction[] = expenseTransactionsJson != null ? JSON.parse(expenseTransactionsJson) : [];
    let incomeTransactions: Transaction[] = incomeTransactionsJson != null ? JSON.parse(incomeTransactionsJson) : [];

    let transactions = [...expenseTransactions, ...incomeTransactions];

    transactions = transactions.filter((transaction) => {
      const transactionDate = new Date(transaction.date);
      return (
        transactionDate.getFullYear() === selectedDate.getFullYear() &&
        transactionDate.getMonth() === selectedDate.getMonth() &&
        transactionDate.getDate() === selectedDate.getDate()
      );
    });
    transactions.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

    return transactions;
  } catch (error) {
    throw new Error(error);
  }
};

export const getTransactionsOfCurrentMonth = async (): Promise<Transaction[]> => {
  try {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth();

    const expenseTransactionsJson = await AsyncStorage.getItem('@expenseTransactions');
    const incomeTransactionsJson = await AsyncStorage.getItem('@incomeTransactions');

    let expenseTransactions: Transaction[] = expenseTransactionsJson != null ? JSON.parse(expenseTransactionsJson) : [];
    let incomeTransactions: Transaction[] = incomeTransactionsJson != null ? JSON.parse(incomeTransactionsJson) : [];

    let transactions = [...expenseTransactions, ...incomeTransactions];

    transactions = transactions.filter((transaction) => {
      const transactionDate = new Date(transaction.date);
      return transactionDate.getFullYear() === currentYear && transactionDate.getMonth() === currentMonth;
    });

    transactions.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

    return transactions;
  } catch (error) {
    throw new Error(error);
  }
};

export const getSumExpenseTransactionsOfCurrentMonth = async (currentDate: Date): Promise<string> => {
  try {
    // const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth();

    const expenseTransactionsJson = await AsyncStorage.getItem('@expenseTransactions');

    let expenseTransactions: Transaction[] = expenseTransactionsJson != null ? JSON.parse(expenseTransactionsJson) : [];

    let currentMonthExpenseTransactions = expenseTransactions.filter((transaction) => {
      const transactionDate = new Date(transaction.date);
      return transactionDate.getFullYear() === currentYear && transactionDate.getMonth() === currentMonth;
    });

    let sum = currentMonthExpenseTransactions.reduce((total, transaction) => total + Number(transaction.value), 0);

    return sum.toFixed(2);
  } catch (error) {
    throw new Error(error);
  }
};

export const getSumIncomeTransactionsOfCurrentMonth = async (currentDate: Date): Promise<string> => {
  try {
    // const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth();

    const incomeTransactionsJson = await AsyncStorage.getItem('@incomeTransactions');

    let incomeTransactions: Transaction[] = incomeTransactionsJson != null ? JSON.parse(incomeTransactionsJson) : [];

    let currentMonthIncomeTransactions = incomeTransactions.filter((transaction) => {
      const transactionDate = new Date(transaction.date);
      return transactionDate.getFullYear() === currentYear && transactionDate.getMonth() === currentMonth;
    });

    let sum = currentMonthIncomeTransactions.reduce((total, transaction) => total + Number(transaction.value), 0);

    return sum.toFixed(2);
  } catch (error) {
    throw new Error(error);
  }
};

export const deleteTransactionById = async (id: string, transactionType: TransactionType): Promise<void> => {
  try {
    const transactionsKey = transactionType === 'expenses' ? '@expenseTransactions' : '@incomeTransactions';
    const transactionsJson = await AsyncStorage.getItem(transactionsKey);
    let transactions: Transaction[] = transactionsJson != null ? JSON.parse(transactionsJson) : [];

    transactions = transactions.filter((transaction) => transaction.id !== id);

    await AsyncStorage.setItem(transactionsKey, JSON.stringify(transactions));
  } catch (error) {
    throw new Error(error);
  }
};

export const getMonthSumByExpenseCategory = async (
  categoryName: string,
  month: number,
  year: number
): Promise<number> => {
  try {
    const transactionsJson = await AsyncStorage.getItem('@expenseTransactions');
    let transactions: Transaction[] = transactionsJson != null ? JSON.parse(transactionsJson) : [];

    let currentMonthTransactions = transactions.filter((transaction) => {
      const transactionDate = new Date(transaction.date);
      return (
        transaction.category.name === categoryName &&
        transactionDate.getMonth() === month &&
        transactionDate.getFullYear() === year
      );
    });

    let sum = currentMonthTransactions.reduce((total, transaction) => total + Number(transaction.value), 0);

    return parseFloat(sum.toFixed(2));
  } catch (error) {
    throw new Error(error);
  }
};

export const getMonthSumByIncomeCategory = async (
  categoryName: string,
  month: number,
  year: number
): Promise<number> => {
  try {
    const transactionsJson = await AsyncStorage.getItem('@incomeTransactions');
    let transactions: Transaction[] = transactionsJson != null ? JSON.parse(transactionsJson) : [];

    let currentMonthTransactions = transactions.filter((transaction) => {
      const transactionDate = new Date(transaction.date);
      return (
        transaction.category.name === categoryName &&
        transactionDate.getMonth() === month &&
        transactionDate.getFullYear() === year
      );
    });

    let sum = currentMonthTransactions.reduce((total, transaction) => total + Number(transaction.value), 0);

    return parseFloat(sum.toFixed(2));
  } catch (error) {
    throw new Error(error);
  }
};
