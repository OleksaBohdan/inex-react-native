import React, { useState, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IMainState, setSelectedDate } from '../state/mainState';
import { StyleSheet, Text, View } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import Icon from '@expo/vector-icons//MaterialIcons';

import {
  getSumExpenseTransactionsOfCurrentMonth,
  getSumIncomeTransactionsOfCurrentMonth,
} from '../repository/transactions';

export default function DatePicker() {
  const selectedDate = useSelector((state: IMainState) => state.selectedDate);
  const [datePickerVisible, setDatePickerVisible] = useState(false);
  const [expenseSum, setExpenseSum] = useState('');
  const [incomeSum, setIncomeSum] = useState('');
  const transactionCreated = useSelector((state: IMainState) => state.transactionCreated);
  const dispatch = useDispatch();

  useEffect(() => {
    showExpenseSum();
    showIncomeSum();
  }, [transactionCreated]);

  const showDatePicker = useCallback(() => {
    setDatePickerVisible(true);
  }, []);

  const hideDatePicker = useCallback(() => {
    setDatePickerVisible(false);
  }, []);

  const handleConfirm = useCallback(
    (date: Date) => {
      dispatch(setSelectedDate({ selectedDate: date.toISOString() }));
      hideDatePicker();
    },
    [hideDatePicker]
  );

  const showExpenseSum = async () => {
    const sum = await getSumExpenseTransactionsOfCurrentMonth(new Date());
    setExpenseSum(sum);
  };
  const showIncomeSum = async () => {
    const sum = await getSumIncomeTransactionsOfCurrentMonth(new Date());
    setIncomeSum(sum);
  };

  return (
    <View style={styles.container}>
      <Text style={[styles.pickerText, styles.textExpenses]}>-{expenseSum || '0'}</Text>
      <Text style={styles.pickerText} onPress={showDatePicker}>
        {selectedDate.slice(0, 10)}
        <Icon name="arrow-drop-down" size={16} color={'#2A3356'} />
      </Text>
      <Text style={[styles.pickerText, styles.textIncomes]}>{incomeSum || '0'}</Text>

      <DateTimePickerModal
        date={new Date(selectedDate)}
        isVisible={datePickerVisible}
        mode="date"
        display="inline"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
        maximumDate={new Date()}
        locale="en_GB"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    padding: 15,
    backgroundColor: '#FFFFFF',
  },
  pickerText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#2A3356',
  },
  textExpenses: {
    color: '#E80000',
  },
  textIncomes: {
    color: '#22980F',
  },
});
