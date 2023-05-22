import React, { useState } from 'react';
import { Modal, StyleSheet, KeyboardAvoidingView, Platform, Keyboard } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';

import DatePicker from '../components/DatePicker';
import TransactionsList from '../components/TransactionsList';
import EnterValue from '../components/EnterValue';
import Comment from '../components/Comment';
import CreateTransactionBtn from '../components/CreateTransactionBtn';
import ChooseCategory from '../components/ChooseCategory';

import TransactionCardScreen from './TransactionCardScreen';

const TodayStack = createStackNavigator();

export function TodayStackNavigator() {
  return (
    <TodayStack.Navigator screenOptions={{ headerShown: false }}>
      <TodayStack.Screen name="TodayScreen" component={Today} />
      <TodayStack.Screen name="TransactionCardScreen" component={TransactionCardScreen} />
    </TodayStack.Navigator>
  );
}

export default function Today({ navigation }) {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
      keyboardVerticalOffset={60}
      onTouchStart={Keyboard.dismiss}
    >
      <DatePicker />
      <TransactionsList navigation={navigation} />
      <EnterValue />
      <Comment />
      <CreateTransactionBtn showModal={() => setModalVisible(true)} />
      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <ChooseCategory closeModal={() => setModalVisible(false)} />
      </Modal>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#D9D9D9',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
