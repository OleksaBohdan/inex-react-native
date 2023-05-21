import React, { useState } from 'react';
import { StyleSheet, KeyboardAvoidingView, Platform, Keyboard } from 'react-native';
import DatePicker from '../components/DatePicker';
import Note from '../components/Note';
import TransactionsList from '../components/TransactionsList';
import MonthInfo from '../components/MonthInfo';
import EnterValue from '../components/EnterValue';
import Comment from '../components/Comment';
import CreateTransactionBtn from '../components/CreateTransactionBtn';
import { Divider } from 'react-native-paper';

export default function Today() {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
      keyboardVerticalOffset={60}
      // onTouchStart={Keyboard.dismiss}
    >
      <DatePicker />
      {/* <Note /> */}
      {/* <MonthInfo /> */}

      <TransactionsList />

      <EnterValue />
      <Comment />
      <CreateTransactionBtn />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 24,
    backgroundColor: '#FFFFFF',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
