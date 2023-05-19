import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';

import DatePicker from '../components/DatePicker';
import TransactionsList from '../components/TransactionsList';
import MonthInfo from '../components/MonthInfo';
import EnterValue from '../components/EnterValue';
import Comment from '../components/Comment';
import CreateTransactionBtn from '../components/CreateTransactionBtn';

export default function Today() {
  return (
    <View style={styles.container}>
      <DatePicker />
      <MonthInfo />
      <TransactionsList />
      <EnterValue />
      <Comment />
      <CreateTransactionBtn />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 24,
  },
});
