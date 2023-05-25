import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import 'react-native-gesture-handler';

export default function TransactionCard({ onPress, category, comment, value, transactionType }) {
  const textColor = transactionType === 'incomes' ? 'green' : 'black';
  const valueDisplay = transactionType === 'expenses' ? `-${value}` : value;

  return (
    <View style={[styles.card]} onTouchEnd={onPress}>
      <View>
        <Text style={styles.categoryText}>{category}</Text>
        {comment !== '' && <Text style={styles.commentText}>{comment}</Text>}
      </View>
      <Text style={[styles.valueText, { color: textColor }]}>{valueDisplay}</Text>
    </View>
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
