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
    const valueAsNumber = parseFloat(transaction.value.replace(',', '.'));
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
    const valueAsNumber = parseFloat(transaction.value.replace(',', '.'));
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

export const getSumExpenseTransactionsOfCurrentMonth = async (): Promise<string> => {
  try {
    const currentDate = new Date();
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

export const getSumIncomeTransactionsOfCurrentMonth = async (): Promise<string> => {
  try {
    const currentDate = new Date();
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
