import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IMainState, setExpenseCategories, setIncomeCategories, toggleTransactionCreated } from '../state/mainState';
import { View, Text, StyleSheet, ScrollView, Keyboard } from 'react-native';
import { TextInput } from 'react-native-paper';
import { SegmentedButtons } from 'react-native-paper';
import Icon from '@expo/vector-icons/MaterialIcons';

import CategoryCard from '../components/CategoryCard';
import {
  createExpenseCategory,
  getAllExpenseCategories,
  deleteExpenseCategory,
  createIncomeCategory,
  getAllIncomeCategories,
  deleteIncomeCategory,
  Category,
} from '../repository/categories';
import { getMonthSumByExpenseCategory, getMonthSumByIncomeCategory } from '../repository/transactions';

export default function Categories() {
  const [choosenCategory, setChoosenCategory] = useState('expenses');
  const [category, setCategory] = useState('');
  const expenseCategories = useSelector((state: IMainState) => state.expenseCategories);
  const incomeCategories = useSelector((state: IMainState) => state.incomeCategories);
  const [error, setError] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    if (choosenCategory === 'expenses') {
      showExpenseCategories();
    } else if (choosenCategory === 'incomes') {
      showIncomeCategories();
    }
    dispatch(toggleTransactionCreated());
  }, [choosenCategory]);

  const showExpenseCategories = async () => {
    try {
      let categories = await getAllExpenseCategories();
      const currentDate = new Date();
      const month = currentDate.getMonth();
      const year = currentDate.getFullYear();
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

  const showIncomeCategories = async () => {
    try {
      let categories = await getAllIncomeCategories();
      const currentDate = new Date();
      const month = currentDate.getMonth();
      const year = currentDate.getFullYear();
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

  const handleAddCategory = async () => {
    if (category !== '') {
      setError('');
      if (choosenCategory === 'expenses') {
        try {
          await createExpenseCategory(category);
          showExpenseCategories();
        } catch (error) {
          setError(error.message);
        }
      } else if (choosenCategory === 'incomes') {
        try {
          await createIncomeCategory(category);
          showIncomeCategories();
        } catch (error) {
          setError(error.message);
        }
      }
      setCategory('');
      dispatch(toggleTransactionCreated());
    }
  };

  const handleDeleteCategory = async (categoryName: string) => {
    setError('');
    if (choosenCategory === 'expenses') {
      try {
        await deleteExpenseCategory(categoryName);
        showExpenseCategories();
      } catch (error) {
        setError(error.message);
      }
    } else if (choosenCategory === 'incomes') {
      try {
        await deleteIncomeCategory(categoryName);
        showIncomeCategories();
      } catch (error) {
        setError(error.message);
      }
    }
    dispatch(toggleTransactionCreated());
  };

  const categoriesToDisplay = choosenCategory === 'expenses' ? expenseCategories : incomeCategories;

  return (
    <View style={styles.container} onTouchStart={Keyboard.dismiss}>
      <View style={styles.headerContainer}>
        <Text style={styles.textHeader}>Categories</Text>
      </View>

      <SegmentedButtons
        value={choosenCategory}
        onValueChange={setChoosenCategory}
        style={styles.segmentedBtns}
        buttons={[
          {
            value: 'expenses',
            label: 'Exprenses',
            checkedColor: 'white',
            style: {
              backgroundColor: choosenCategory === 'expenses' ? '#2E76B0' : 'white',
            },
          },

          {
            value: 'incomes',
            label: 'Incomes',
            checkedColor: 'white',
            style: {
              backgroundColor: choosenCategory === 'incomes' ? '#2E76B0' : 'white',
            },
          },
        ]}
      />
      <View>
        <TextInput
          label="Category name"
          style={styles.textInput}
          maxLength={20}
          mode="outlined"
          value={category}
          onChangeText={setCategory}
        />
        <Text style={styles.errorText}>{error}</Text>

        <View style={styles.addBtnContainer}>
          <Icon style={styles.addBtn} name={'add-circle-outline'} onPress={handleAddCategory} />
        </View>
      </View>

      <ScrollView style={styles.categoryList}>
        {categoriesToDisplay.map((category: Category, index: number) => (
          <CategoryCard key={index} name={category.name} onDelete={() => handleDeleteCategory(category.name)} />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    width: '100%',
    paddingHorizontal: 24,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  textHeader: {
    fontSize: 24,
    fontWeight: '500',
  },
  segmentedBtns: {
    marginTop: 24,
  },
  categoryList: {
    marginTop: 24,
  },
  textInput: {
    backgroundColor: '#FFFFFF',
    marginTop: 16,
  },
  addBtnContainer: {
    marginTop: 24,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  addBtn: {
    fontSize: 48,
    color: '#2E76B0',
  },
  errorText: {},
});
