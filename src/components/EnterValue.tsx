import { Keyboard, StyleSheet, View, TouchableOpacity } from 'react-native';
import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IMainState, setSelectedTransactionType, setEnteredValue } from '../state/mainState';
import Icon from '@expo/vector-icons/MaterialIcons';
import { TextInput } from 'react-native-paper';
import * as Haptics from 'expo-haptics';

import { TransactionType } from '../repository/transactions';

export default function EnterValue() {
  const selectedTransactionType = useSelector((state: IMainState) => state.selectedTransactionType);
  const enteredValue = useSelector((state: IMainState) => state.enteredValue);
  const dispatch = useDispatch();

  const handleChooseTransactionType = useCallback((type: TransactionType) => {
    dispatch(setSelectedTransactionType({ selectedTransactionType: type }));
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  }, []);

  const handleEnterValue = (value: string) => {
    dispatch(setEnteredValue({ enteredValue: value }));
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => handleChooseTransactionType('expenses')}>
        <Icon
          style={styles.expensesIcon}
          name={selectedTransactionType === 'expenses' ? 'remove-circle' : 'remove-circle-outline'}
        />
      </TouchableOpacity>

      <TextInput
        label="Total"
        style={styles.valueInput}
        keyboardType="numeric"
        maxLength={10}
        onBlur={() => Keyboard.dismiss()}
        mode="outlined"
        value={enteredValue}
        onChangeText={handleEnterValue}
      />

      <TouchableOpacity onPress={() => handleChooseTransactionType('incomes')}>
        <Icon
          style={styles.incomesIcon}
          name={selectedTransactionType === 'incomes' ? 'add-circle' : 'add-circle-outline'}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 24,
    marginTop: 8,
    backgroundColor: '#FFFFFF',
  },
  valueInput: {
    width: 155,
    height: 56,
    backgroundColor: '#FFFFFF',
    fontSize: 24,
  },
  expensesIcon: {
    fontSize: 56,
    color: '#2E76B0',
  },
  incomesIcon: {
    fontSize: 56,
    color: '#2E76B0',
  },
});
