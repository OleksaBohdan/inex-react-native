import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Button } from 'react-native-paper';

export default function CreateTransactionBtn({ showModal }) {
  return (
    <View style={styles.container}>
      <Button mode="contained" onPress={showModal} contentStyle={styles.addBtn} style={{ borderRadius: 100 }}>
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
