import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Keyboard } from 'react-native';
import { TextInput } from 'react-native-paper';
import { SegmentedButtons } from 'react-native-paper';
import Icon from '@expo/vector-icons/MaterialIcons';

import CategoryCard from '../components/CategoryCard';
import { createExpenseCategory } from '../repository/categories';

export default function Category() {
  const [value, setValue] = useState('expenses');
  const [category, setCategory] = useState('');
  const [error, setError] = useState('');

  const handleAddCategory = async () => {
    if (category !== '') {
      setError('');
      if (value === 'expenses') {
        try {
          await createExpenseCategory(category);
          setCategory('');
        } catch (error) {
          setError(error.message);
        }
      }
    }
  };

  return (
    <View style={styles.container} onTouchStart={Keyboard.dismiss}>
      <View style={styles.headerContainer}>
        <Text style={styles.textHeader}>Categories</Text>
      </View>

      <SegmentedButtons
        value={value}
        onValueChange={setValue}
        style={styles.segmentedBtns}
        buttons={[
          {
            value: 'expenses',
            label: 'Exprenses',
            checkedColor: 'white',
            style: {
              backgroundColor: value === 'expenses' ? '#2E76B0' : 'white',
            },
          },

          {
            value: 'incomes',
            label: 'Incomes',
            checkedColor: 'white',
            style: {
              backgroundColor: value === 'incomes' ? '#2E76B0' : 'white',
            },
          },
        ]}
      />
      <View>
        <Text>{error}</Text>
        <TextInput
          label="Category name"
          style={styles.textInput}
          maxLength={20}
          mode="outlined"
          value={category}
          onChangeText={setCategory}
        />

        <View style={styles.addBtnContainer}>
          <Icon style={styles.addBtn} name={'add-circle-outline'} onPress={handleAddCategory} />
        </View>
      </View>

      <ScrollView style={styles.categoryList}>
        <CategoryCard name={'Name'} />
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
});
