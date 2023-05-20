import React, { useState } from 'react';
import { View, StyleSheet, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard } from 'react-native';
import DatePicker from '../components/DatePicker';
import TransactionsList from '../components/TransactionsList';
import MonthInfo from '../components/MonthInfo';
import EnterValue from '../components/EnterValue';
import Comment from '../components/Comment';
import CreateTransactionBtn from '../components/CreateTransactionBtn';

export default function Today() {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
      keyboardVerticalOffset={60}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={styles.container}>
          <View style={styles.topContainer}>
            <DatePicker />
            <MonthInfo />
            <TransactionsList />
          </View>

          <View style={styles.bottomContainer}>
            <EnterValue />
            <Comment />
            <CreateTransactionBtn />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'space-between',
  },
  topContainer: {
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 24,
  },
  bottomContainer: {
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 24,
  },
});
