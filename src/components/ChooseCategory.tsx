import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  IMainState,
  setExpenseCategories,
  setIncomeCategories,
  setEnteredValue,
  setEnteredComment,
  toggleTransactionCreated,
} from '../state/mainState';
import { StyleSheet, View, Text, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import Icon from '@expo/vector-icons/MaterialIcons';

import { Transaction, createExpenseTransaction, createIncomeTransaction } from '../repository/transactions';
import { Category, getAllExpenseCategories, getAllIncomeCategories } from '../repository/categories';

export default function ChooseCategory({ closeModal }) {
  const [choosenCategory, setChoosenCategory] = useState<Category>();
  const selectedDate = useSelector((state: IMainState) => state.selectedDate);
  const selectedTransactionType = useSelector((state: IMainState) => state.selectedTransactionType);
  const enteredValue = useSelector((state: IMainState) => state.enteredValue);
  const enteredComment = useSelector((state: IMainState) => state.enteredComment);
  const expenseCategories = useSelector((state: IMainState) => state.expenseCategories);
  const incomeCategories = useSelector((state: IMainState) => state.incomeCategories);
  const [error, setError] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    if (selectedTransactionType === 'expenses') {
      showExpenseCategories();
    } else if (selectedTransactionType === 'incomes') {
      showIncomeCategories();
    }
  }, [selectedTransactionType]);

  const showExpenseCategories = async () => {
    try {
      let categories = await getAllExpenseCategories();
      categories = categories.sort((a, b) => b.range - a.range);
      dispatch(setExpenseCategories({ expenseCategories: categories }));
    } catch (error) {
      setError(error.message);
    }
  };

  const showIncomeCategories = async () => {
    try {
      let categories = await getAllIncomeCategories();
      categories = categories.sort((a, b) => b.range - a.range);
      dispatch(setIncomeCategories({ incomeCategories: categories }));
    } catch (error) {
      setError(error.message);
    }
  };

  const categoriesToDisplay = selectedTransactionType === 'expenses' ? expenseCategories : incomeCategories;

  const createTransaction = async (category: Category) => {
    setChoosenCategory(category);

    const transaction: Transaction = {
      id: '',
      value: enteredValue,
      transactionType: selectedTransactionType,
      category,
      comment: enteredComment,
      date: selectedDate,
    };

    if (selectedTransactionType === 'expenses') {
      try {
        await createExpenseTransaction(transaction);
      } catch (error) {
        setError(error);
      }
    } else if (selectedTransactionType === 'incomes') {
      try {
        await createIncomeTransaction(transaction);
      } catch (error) {
        setError(error);
      }
    }

    dispatch(toggleTransactionCreated());
    dispatch(setEnteredValue({ enteredValue: '' }));
    dispatch(setEnteredComment({ enteredComment: '' }));

    closeModal();
  };

  return (
    <SafeAreaView style={styles.modalBackgroundStyle}>
      <View style={[styles.content, { height: '65%' }]}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Categories</Text>
          <Icon name="close" onPress={closeModal} size={24} />
        </View>
        <Text style={styles.subHeaderText}>{selectedTransactionType}</Text>
        <ScrollView>
          {categoriesToDisplay.map((category: Category, index: number) => (
            <ChooseCategoryCard key={index} name={category.name} onPress={() => createTransaction(category)} />
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
12;
const ChooseCategoryCard = ({ name, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.card]}>
      <Text style={styles.cardNameText}>{name}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  modalBackgroundStyle: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  content: {
    backgroundColor: '#FFFFFF',
    width: '100%',
    padding: 24,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#CACCCE',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  headerText: {
    fontSize: 24,
    fontWeight: '500',
    marginBottom: 8,
  },
  subHeaderText: {
    fontSize: 14,
    fontWeight: '400',
    marginBottom: 24,
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
