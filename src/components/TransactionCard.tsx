import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IMainState, setSelectedTransaction } from '../state/mainState';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import 'react-native-gesture-handler';

import { Transaction } from '../repository/transactions';

export default function TransactionCard({ onPress, category, comment, value, transactionType, transaction }) {
  const textColor = transactionType === 'incomes' ? '#22980F' : '#000000';
  const valueDisplay = transactionType === 'expenses' ? `-${value}` : value;
  const dispatch = useDispatch();

  const handlePress = () => {
    onPress();
    console.log(transaction.id);
    dispatch(setSelectedTransaction({ selectedTransaction: transaction }));
  };

  return (
    <TouchableOpacity style={[styles.card]} onPress={handlePress}>
      <View>
        <Text style={styles.categoryText}>{category}</Text>
        {comment !== '' && <Text style={styles.commentText}>{comment}</Text>}
      </View>
      <Text style={[styles.valueText, { color: textColor }]}>{valueDisplay}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderColor: '#D9D9D9',
    height: 53,
    flexDirection: 'row',
    paddingVertical: 0,
    paddingHorizontal: 13,
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    marginVertical: 4,
  },
  categoryText: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 4,
  },
  commentText: {
    fontSize: 10,
    fontWeight: '300',
  },
  valueText: { fontSize: 16, color: '#000000', fontWeight: '500' },
});
