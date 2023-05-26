import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { IMainState } from '../state/mainState';
import { StyleSheet, View, ScrollView, Keyboard, Text } from 'react-native';

import { Transaction, getTransactionsByDay } from '../repository/transactions';
import TransactionCard from './TransactionCard';

export default function TransactionsList({ navigation }) {
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const selectedDate = useSelector((state: IMainState) => state.selectedDate);
  const transactionCreated = useSelector((state: IMainState) => state.transactionCreated);

  const fetchTransactions = async () => {
    const transactions = await getTransactionsByDay(selectedDate);
    setTransactions(transactions);
  };

  useEffect(() => {
    fetchTransactions();

    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
      setKeyboardVisible(true);
    });
    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardVisible(false);
    });

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, [selectedDate, transactionCreated]);

  const handlePress = () => {
    Keyboard.dismiss();
    if (!isKeyboardVisible) {
      navigation.navigate('TransactionCardScreen');
    }
  };

  return (
    <View style={styles.container} onTouchStart={Keyboard.dismiss}>
      <View style={styles.container} onTouchStart={Keyboard.dismiss}>
        {transactions.length > 0 ? (
          <ScrollView>
            {transactions.map((transaction, index) => (
              <TransactionCard
                key={index}
                category={transaction.category.name}
                comment={transaction.comment}
                value={transaction.value}
                transactionType={transaction.transactionType}
                onPress={handlePress}
                transaction={transaction}
              />
            ))}
          </ScrollView>
        ) : (
          <Text>No transactions for the selected day.</Text>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 8,
    width: '100%',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 15,
    paddingTop: 16,
  },
});
