import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { useSelector } from 'react-redux';
import { IMainState } from '../state/mainState';
import { Button } from 'react-native-paper';

export default function CreateTransactionBtn({ showModal }) {
  const enteredValue = useSelector((state: IMainState) => state.enteredValue);

  const handlePress = () => {
    if (enteredValue !== '') {
      showModal();
    }
  };

  return (
    <View style={styles.container}>
      <Button mode="contained" onPress={handlePress} contentStyle={styles.addBtn} style={{ borderRadius: 50 }}>
        <Text style={styles.textBtn}>Create transaction</Text>
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingVertical: 24,
    paddingHorizontal: 15,
    backgroundColor: '#FFFFFF',
  },
  addBtn: {
    width: '100%',
    height: 56,
    backgroundColor: '#0077B5',
  },
  textBtn: {
    fontSize: 16,
    color: '#FFFFFF',
    textAlign: 'center',
  },
});
