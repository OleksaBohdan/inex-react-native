import React, { useState, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IMainState, setExpenseCategories, setIncomeCategories } from '../state/mainState';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import Icon from '@expo/vector-icons//MaterialIcons';

import {
  getSumExpenseTransactionsOfCurrentMonth,
  getSumIncomeTransactionsOfCurrentMonth,
  getMonthSumByExpenseCategory,
  getMonthSumByIncomeCategory,
} from '../repository/transactions';
import { getAllExpenseCategories, getAllIncomeCategories } from '../repository/categories';

export default function Report() {
  const [choosenDate, setChoosenDate] = useState(new Date());
  const transactionCreated = useSelector((state: IMainState) => state.transactionCreated);
  const [expenseSum, setExpenseSum] = useState('');
  const [incomeSum, setIncomeSum] = useState('');
  const expenseCategories = useSelector((state: IMainState) => state.expenseCategories);
  const incomeCategories = useSelector((state: IMainState) => state.incomeCategories);
  const [error, setError] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    showExpenseSum();
    showIncomeSum();
    showExpenseCategories(choosenDate);
    showIncomeCategories(choosenDate);
  }, [transactionCreated, choosenDate]);

  const showExpenseSum = async () => {
    const sum = await getSumExpenseTransactionsOfCurrentMonth(choosenDate);
    setExpenseSum(sum);
  };
  const showIncomeSum = async () => {
    const sum = await getSumIncomeTransactionsOfCurrentMonth(choosenDate);
    setIncomeSum(sum);
  };

  const showExpenseCategories = async (date: Date) => {
    try {
      let categories = await getAllExpenseCategories();
      const month = date.getMonth();
      const year = date.getFullYear();
      for (let category of categories) {
        const total = await getMonthSumByExpenseCategory(category.name, month, year);
        category.total = total;
      }
      // sort by 'total'
      categories = categories.sort((a, b) => b.total - a.total);
      dispatch(setExpenseCategories({ expenseCategories: categories }));
    } catch (error) {
      setError(error.message);
    }
  };

  const showIncomeCategories = async (date: Date) => {
    try {
      let categories = await getAllIncomeCategories();
      const month = date.getMonth();
      const year = date.getFullYear();
      for (let category of categories) {
        const total = await getMonthSumByIncomeCategory(category.name, month, year);
        category.total = total;
      }
      // sort by 'total'
      categories = categories.sort((a, b) => b.total - a.total);
      dispatch(setIncomeCategories({ incomeCategories: categories }));
    } catch (error) {
      setError(error.message);
    }
  };

  const decrementMonth = () => {
    setChoosenDate((prevState) => new Date(prevState.getFullYear(), prevState.getMonth() - 1));
  };

  const incrementMonth = () => {
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();
    setChoosenDate((prevState) => {
      const prevMonth = prevState.getMonth();
      const prevYear = prevState.getFullYear();
      // Allow increment only if it's not the current month and year
      if (prevYear < currentYear || (prevYear === currentYear && prevMonth < currentMonth)) {
        return new Date(prevState.getFullYear(), prevState.getMonth() + 1);
      }
      return prevState;
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={decrementMonth} style={{ width: 40 }}>
          <Icon name="arrow-left" size={30} color={'#2A3356'} />
        </TouchableOpacity>

        <Text style={styles.textHeader}>
          {choosenDate.getFullYear()}-{`0${choosenDate.getMonth() + 1}`.slice(-2)}
        </Text>
        <TouchableOpacity onPress={incrementMonth} style={{ width: 40 }}>
          <Icon name="arrow-right" size={30} color={'#2A3356'} />
        </TouchableOpacity>
      </View>

      <ScrollView>
        <View style={styles.categoryHeader}>
          <Text style={styles.categoryHeaderText}>Month Incomes</Text>
          <Text style={styles.categoryHeaderText}>{incomeSum}</Text>
        </View>
        {incomeCategories.map((category, index) => (
          <ReportCard key={index} name={category.name} total={category.total} />
        ))}

        <View style={styles.categoryHeader}>
          <Text style={styles.categoryHeaderText}>Month Expenses</Text>
          <Text style={styles.categoryHeaderText}>-{expenseSum}</Text>
        </View>
        {expenseCategories.map((category, index) => (
          <ReportCard key={index} name={category.name} total={`-${category.total}`} />
        ))}
      </ScrollView>
    </View>
  );
}

const ReportCard = ({ name, total }) => {
  return (
    <View style={[styles.card]}>
      <Text style={styles.cardNameText}>{name}</Text>
      <Text style={styles.cardNameText}>{total}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    width: '100%',
    paddingHorizontal: 24,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  textHeader: {
    fontSize: 24,
    fontWeight: '500',
  },
  categoryHeader: {
    marginTop: 32,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  categoryHeaderText: {
    fontSize: 16,
    fontWeight: '500',
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderColor: '#D9D9D9',
    height: 53,
    flexDirection: 'row',
    marginVertical: 4,
    paddingHorizontal: 13,
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
  },
  cardNameText: {
    fontSize: 16,
    fontWeight: '500',
  },
});
