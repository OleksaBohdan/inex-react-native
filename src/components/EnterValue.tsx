import { Keyboard, StyleSheet, View, TouchableOpacity } from 'react-native';
import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IMainState, setSelectedTransactionType, setEnteredValue } from '../state/mainState';
import { TextInput, Text } from 'react-native-paper';
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
      <TouchableOpacity
        style={[
          styles.transactionBtn,
          styles.transactionLeftBtn,
          selectedTransactionType === 'expenses' ? styles.activeTransactionBtn : {},
        ]}
        onPress={() => handleChooseTransactionType('expenses')}
      >
        <Text style={selectedTransactionType === 'expenses' ? styles.activeText : {}}>Expense</Text>
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

      <TouchableOpacity
        style={[
          styles.transactionBtn,
          styles.transactionRightBtn,
          selectedTransactionType === 'incomes' ? styles.activeTransactionBtn : {},
        ]}
        onPress={() => handleChooseTransactionType('incomes')}
      >
        <Text style={selectedTransactionType === 'incomes' ? styles.activeText : {}}>Income</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingHorizontal: 15,
    paddingVertical: 24,
    marginTop: 8,
    backgroundColor: '#FFFFFF',
  },
  valueInput: {
    width: 155,
    height: 56,
    backgroundColor: '#FFFFFF',
    fontSize: 16,
    borderColor: 'red',
  },
  expensesIcon: {
    fontSize: 56,
    color: '#2E76B0',
  },
  incomesIcon: {
    fontSize: 56,
    color: '#2E76B0',
  },
  transactionBtn: {
    height: 58,
    backgroundColor: '#FFFFFF',
    width: 100,
    borderWidth: 1,
    borderColor: 'grey',
    justifyContent: 'center',
    alignItems: 'center',
  },
  transactionLeftBtn: {
    borderTopLeftRadius: 30,
    borderBottomLeftRadius: 30,
    borderEndWidth: 0,
  },
  transactionRightBtn: {
    borderTopRightRadius: 30,
    borderBottomRightRadius: 30,
    borderStartWidth: 0,
  },
  activeTransactionBtn: {
    backgroundColor: '#2E76B0',
    borderColor: '#2E76B0',
  },
  activeText: {
    color: '#FFFFFF',
    fontWeight: '500',
  },
});
