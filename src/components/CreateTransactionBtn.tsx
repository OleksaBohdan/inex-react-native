import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Button } from 'react-native-paper';

export default function CreateTransactionBtn() {
  return (
    <View style={styles.container}>
      <Button mode="contained" onPress={() => console.log('Pressed')} style={styles.addBtn}>
        <Text style={styles.textBtn}>Create transaction</Text>
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginTop: 24,
    marginBottom: 10,
  },
  addBtn: {
    width: '100%',
    height: 56,
    borderRadius: 100,
    backgroundColor: '#0077B5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textBtn: {
    fontSize: 16,
    width: '100%',
    // lineHeight: 56,
  },
});
