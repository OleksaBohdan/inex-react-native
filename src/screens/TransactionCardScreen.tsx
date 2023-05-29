import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IMainState, toggleTransactionCreated } from '../state/mainState';
import { StyleSheet, Text, View, Keyboard } from 'react-native';
import { TextInput } from 'react-native-paper';
import Toast from 'react-native-toast-message';
import Icon from '@expo/vector-icons/MaterialIcons';

import { deleteTransactionById, TransactionType, updateTransactionById } from '../repository/transactions';

export default function TransactionCardScreen({ navigation }) {
  const selectedTransaction = useSelector((state: IMainState) => state.selectedTransaction);
  const [transactionValue, setTransactionValue] = useState(selectedTransaction.value);
  const dispatch = useDispatch();

  const deleteTransaction = async (id: string, type: TransactionType) => {
    try {
      await deleteTransactionById(id, type);
      dispatch(toggleTransactionCreated());
      navigation.goBack();
    } catch (error) {
      alert(error.message);
    }
  };

  const showToast = () => {
    Toast.show({
      type: 'success',
      position: 'top',
      text1: 'Update Successful',
      text2: 'Transaction updated successfully',
    });
  };

  const updateTransactionValue = async () => {
    try {
      await updateTransactionById(selectedTransaction.id, selectedTransaction.transactionType, {
        value: transactionValue,
      });
      dispatch(toggleTransactionCreated());
      showToast();
    } catch (error) {
      alert(error.message);
    }
  };

  const headerColor = selectedTransaction.transactionType === 'expenses' ? '#CF5B4A' : '#88B548';

  return (
    <View style={styles.container} onTouchStart={Keyboard.dismiss}>
      <View style={[styles.header, { backgroundColor: headerColor }]}>
        <Text style={styles.headerText}>{selectedTransaction.transactionType}</Text>
      </View>
      <View style={styles.mainContainer}>
        <View style={styles.valueContainer}>
          <TextInput
            label="Total"
            style={styles.valueInput}
            keyboardType="numeric"
            maxLength={10}
            onBlur={updateTransactionValue}
            mode="outlined"
            value={transactionValue}
            onChangeText={setTransactionValue}
          />
          <View>
            <Icon
              name="delete"
              style={styles.deleteIcon}
              onPress={() => {
                deleteTransaction(selectedTransaction.id, selectedTransaction.transactionType);
              }}
            />
          </View>
        </View>

        <View style={styles.dataContainer}>
          <Text style={styles.nameText}>Date</Text>
          <Text style={styles.valueTableText}>{selectedTransaction.date.slice(0, 10)}</Text>
        </View>
        <View style={styles.dataContainer}>
          <Text style={styles.nameText}>Category</Text>
          <Text style={styles.valueTableText}>{selectedTransaction.category.name}</Text>
        </View>
        <View style={styles.dataContainer}>
          <Text style={styles.nameText}>Comments</Text>
          <Text style={styles.valueTableText}>{selectedTransaction.comment}</Text>
        </View>
      </View>
      <Toast />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    height: 120,
    backgroundColor: '#88B548',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerText: { color: '#FFFFFF', fontSize: 24, fontWeight: '500' },
  mainContainer: {
    paddingHorizontal: 24,
    paddingVertical: 32,
  },
  valueContainer: {
    marginBottom: 32,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  valueInput: {
    width: '80%',
    height: 56,
    backgroundColor: '#FFFFFF',
    fontSize: 24,
  },
  deleteIcon: {
    fontSize: 24,
    color: '#CF5B4A',
  },
  dataContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#86888A',
  },
  nameText: {
    fontSize: 16,
    fontWeight: '400',
    color: '#86888A',
  },
  valueTableText: {
    fontSize: 16,
    fontWeight: '400',
    color: '#000000',
  },
});
